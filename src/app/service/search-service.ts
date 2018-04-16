import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../model/product';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import { Client } from 'elasticsearch';
import {PropFilterCondition} from '../../components/filter/filter';

export enum SortOrderEnum {
  Relevance = 1,
  PriceLowToHigh = 2,
  PriceHighToLow = 3,
  Popularity = 4,
  Rating = 5
}

export class ProductSearchParams {
  constructor (
  public srchText?: string,
  public categoryId?: number,
  public supplier?: number[],
  public productProps?: PropFilterCondition[],
  public sortOrder: SortOrderEnum = SortOrderEnum.Relevance)
  {}
}

class ProductPropsAgg {
  constructor (
    public propId: number,
    public propVals: string[]
  ){}
}

@Injectable()
export class SearchService {
  private cKey = 'searchItems';
  private cMaxSearchItemsCount;
  private _ls: string = '';
  private client: Client;
  private readonly INDEX = 'product';
  private readonly TYPE = null;
  private SIZE = 30;
  private MAX_ITEMS_COUNT = 360;

  products = [];
  searchItems = new Array<string>();
  lastSearchStringUpdated = new EventEmitter<string>();
  searchResults: Promise<Product[]>;
  inSearch = false;
  hostPage: any;
  prodSrchParams: ProductSearchParams = null;
  hitsTotal = 0;
  lastItemIndex = 0;
  aggs: any;

  constructor(private repo: AbstractDataRepository) {
    this.initData();
    const stor = JSON.parse(localStorage.getItem(this.cKey));
    if (stor) {
      stor.forEach((val) => {
        this.searchItems.push(val);
      });
    }
  }

  async initData() {
    if (!this.client)
      await this.connect();
    this.cMaxSearchItemsCount = parseInt(await this.repo.getAppParam('SEARCH_HISTORY_MAX_LIST_LENGTH'));
    this.MAX_ITEMS_COUNT = parseInt(await this.repo.getAppParam('ELASTIC_PRODUCT_SEARCH_ITEMS_MAX_COUNT'));
    this.SIZE = parseInt(await this.repo.getAppParam('ELASTIC_PRODUCT_SEARCH_PAGE_SIZE'));
  }

  public get inFilter() : boolean {
    let res = false;
    if (!this.prodSrchParams)
      return res;
    if (
          ((this.prodSrchParams.supplier) && (this.prodSrchParams.supplier.length > 0))
          ||
          ((this.prodSrchParams.productProps) && (this.prodSrchParams.productProps.length > 0))
    ) res = true;
    return res;
  }

  public get lastSearch(): string {
    return this._ls;
  }

  public set lastSearch(value: string) {
    this._ls = value;
    this.lastSearchStringUpdated.emit(value);
  }

  private async connect() {
    this.client = new Client({
      host: await this.repo.getAppParam('ELASTIC_ENDPOINT')
    });
  }

  resetSearch() {
    this.lastItemIndex = 0;
    this.products = [];
  }

  async searchByCategory (catId: number) {
    this.resetSearch();
    this.lastSearch = null;
    this.prodSrchParams = new ProductSearchParams(undefined, catId);
    await this.getProductsData();
  }

  async search() {
    this.resetSearch();
    await this.getProductsData();
  }

  async searchByText(srchText: string) {
    this.resetSearch();
    this.prodSrchParams = new ProductSearchParams(srchText);
    await this.getProductsData();
  }

  loadNext() {
    if (
          (this.products.length > this.MAX_ITEMS_COUNT)
            ||
          (this.products.length === this.hitsTotal)
       ) return;
    this.getProductsData();
  }

  async getProductsData() {
    if (this.inSearch)
      return;
    try {
      this.inSearch = true;
      let response = await this.getProducts(this.lastItemIndex);
      if (response.hits.hits)
      {
        let _chunk = response.hits.hits.map(
          x => this.repo.getProductFromResponse(x._source)
        );

        if (_chunk)
        {
          if (this.lastItemIndex === 0)
            this.products = _chunk;
          else
            this.products = this.products.concat(_chunk);

          this.lastItemIndex = this.lastItemIndex + _chunk.length;
        }
      }
/*
      else
      {
        if (this.lastItemIndex === 0)
          this.products = [];
      }
*/
      this.aggs = response.aggregations;
      this.hitsTotal = response.hits.total;
    }
    finally
    {
      this.hostPage.cont.resize();
      this.inSearch = false;
    }
  }

  packPropsArray(inArray: PropFilterCondition[]): ProductPropsAgg[] {
    let res = new Array<ProductPropsAgg>() ;
    inArray.forEach(x => {
        let fnd: ProductPropsAgg = res.find( a => a.propId === x.propId );
        if (!fnd)
        {
          let ar = new Array<string>();
          ar.push(x.propVal);
          res.push(new ProductPropsAgg(x.propId, ar) );
        }
        else
        {
          fnd.propVals.push(x.propVal);
        };
      }
    );
    return res;
  }


  async getSuggestData(inText: string): Promise<any> {
    try {
      this.inSearch = true;
      let data = await this.getSuggestions(inText);
      return data.suggest;
    }
    finally {
      this.inSearch = false;
    }
  }

  async getSuggestions(inText: string): Promise<any> {
    const query = {
      'suggest': {
        'inpSuggest': {
          'text': `${inText}`,
          'term': {
            'field': 'srchString',
            'sort': 'score',
            'min_word_length': 2
          }
        }
      }
    };

    return this.client.search({
      index: this.INDEX,
      type: this.TYPE,
      filterPath: ['suggest'],
      body: query});
  }

  async getProducts(_from: number): Promise<any> {
    let sort = null;
    let mustArr = [];

    if (this.prodSrchParams.sortOrder === SortOrderEnum.Relevance) {
      sort = [{'_score': {'order' : 'desc'}}];
    };
    if (this.prodSrchParams.sortOrder === SortOrderEnum.Rating) {
      sort = [{'rating': {'order' : 'desc'}}];
    };
    if (this.prodSrchParams.sortOrder === SortOrderEnum.Popularity) {
      sort = [{'popularity': {'order' : 'desc'}}];
    };
    if (this.prodSrchParams.sortOrder === SortOrderEnum.PriceLowToHigh) {
      sort = [{'price': {'order' : 'asc'}}];
    };
    if (this.prodSrchParams.sortOrder === SortOrderEnum.PriceHighToLow) {
      sort = [{'price': {'order' : 'desc'}}];
    };

    if ((this.prodSrchParams.supplier) && (this.prodSrchParams.supplier.length >=1)) {
      let terms = [];
      this.prodSrchParams.supplier.forEach(
        x => terms.push({'term': {"manufacturerId" : `${x}`}})
      );
      let mnf = {'bool': {'should': terms}};
      mustArr.push(mnf);
    };

    if ((this.prodSrchParams.productProps) && (this.prodSrchParams.productProps.length >= 1)) {
      let terms = [];
      let propsAgg = this.packPropsArray(this.prodSrchParams.productProps);

      propsAgg.forEach(
        x => {
                let propValArrExpr = [];

                x.propVals.forEach(y => {
                    propValArrExpr.push(
                      { 'match_phrase': {'propsF.pVal': `${y}`} }
                    );
                  }
                );


                let propExpr = {
                  'nested': {
                    'path': 'propsF',
                    'query': {
                      'bool': {
                        'must': [
                          {
                            'bool': {
                              'should': propValArrExpr
                            }
                          },
                          {
                            'term': {
                              'propsF.id_Prop.id': {'value': `${x.propId}`}
                            }
                          }
                        ]
                      }
                    }
                  }
                };

                terms.push(propExpr);

             }
      );

      let prop = {'bool': {'must': terms}};
      mustArr.push(prop);
    };

    if (this.prodSrchParams.srchText) {
      mustArr.push({'simple_query_string': {
                                      'query': `${this.prodSrchParams.srchText}`,
                                      'fields': [ 'name', 'description', 'srchString', 'id'],
                                      'default_operator': 'and'
                                    }
            });
    };

    if (this.prodSrchParams.categoryId) {
      mustArr.push({
                      'nested' : {
                      'path' : 'groups',
                        'query' : {
                        'term': {
                          'groups.id': {
                            'value': `${this.prodSrchParams.categoryId}`
                          }
                        }
                      }
                    }
      });
    };

    return this.client.search({
      index: this.INDEX,
      type: this.TYPE,
      filterPath: ['hits.hits._source', 'hits.total', 'aggregations'],
      body:
        {
        'from': _from,
        'size': this.SIZE,
        'sort': sort,
        'query': {
          'bool': {
            'must':
              mustArr
          }
        },
        'aggs': {
          'mnfAgg': {
            'terms': {"script":"doc ['manufacturer.id'].value + '|' + doc['manufacturer.name'].value"}
          },
          'propsAgg': {
            'nested': {
              'path': 'propsF'
            },
            'aggs': {
              'idProp': {
                'terms': {"script":"doc ['propsF.id_Prop.id'].value + '|' + doc ['propsF.id_Prop.name'].value + '|' + doc ['propsF.out_bmask'].value"},
                'aggs': {
                  'propVal': {
                    'terms': {'field': 'propsF.pVal' }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async searchProducts(srchString: string, hostPage: any) {
    this.hostPage = hostPage;
    await this.searchByText(srchString);

    if (this.products.length > 0) //сохраняем поисковые запросы, которые вернули данные
    {
      const i = this.searchItems.indexOf(srchString);
      if (!(i == -1))
        this.searchItems.splice(i,1);
      this.searchItems.splice(0,0, srchString);
      this.searchItems = this.searchItems.splice(0, this.cMaxSearchItemsCount);

      //Сохраняем массив в сторадже
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
    this.lastSearch = srchString;
  }

  removeSearchItem(str: string) {
    let i = this.searchItems.indexOf(str);
    if (!(i == -1)) {
      this.searchItems.splice(i, 1);
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
  }

}
