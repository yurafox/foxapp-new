import {Component, Input, Renderer} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {PageMode} from '../../pages/home/home';
import {Subject} from 'rxjs/Subject';


class SearchSuggestItem {
  constructor (
    public isClosable: boolean,
    public itemText: string
  ){}
}

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase {

  @Input()
  public hostPage: any = null;

  srchTextInputStream$ = new Subject<string>();

  public srchItemsArr = new Array<SearchSuggestItem>();
  searchValue = null;
  inputMode = false;


  constructor(public searchService: SearchService,
              public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private srchService: SearchService, private renderer: Renderer) {
    super();

    searchService.lastSearchStringUpdated.subscribe(
      (value: string) => {
        this.searchValue = value;
      }
    );

    this.initTmpSearchArray();

    this.srchTextInputStream$.debounceTime(200)
      .distinctUntilChanged()
      .subscribe(inputValue =>
        {
          this.incSearch();
        }
      );
  }

  async searchByText(searchString: string) {
    if (searchString) {
      this.searchValue = searchString;
      this.srchService.products = [];
      this.srchService.searchProducts(searchString, this.hostPage);
      (<any>this.hostPage).pageMode = PageMode.SearchResultsMode;
      this.inputMode = false;
    }
  }

  searchByBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.searchValue = barcodeData.text;
      this.incSearch();
      this.searchByText(this.searchValue);
    }, (err) => {
      console.log('An error while scanning barcode occurred: ' + err);
    });
  }

  initTmpSearchArray() {
    const ar = this.searchService.searchItems;
    ar.forEach((item) => {
      this.srchItemsArr.push(new SearchSuggestItem(true, item));
    });
    this.searchValue = this.searchService.lastSearch;
  }

  async incSearch() {
    this.srchItemsArr = [];

    let ar = [];
    if (this.searchValue)
      ar = this.searchService.searchItems.filter((value) => {
        return !(value.toLowerCase().indexOf(this.searchValue.toLowerCase()) == -1);
      }).slice()
    else
      ar = this.searchService.searchItems;

    ar.forEach(x =>
      this.srchItemsArr.push(new SearchSuggestItem(true, x))
    );

    if (this.searchValue) {
      let res = await this.srchService.getSuggestData(this.searchValue);
      let varArr = [];
      res.inpSuggest.forEach(
        x => {
          const txt = x.text;
          const opts = x.options;
          let s = null;
          if (opts.length>0)
            s = opts[0].text
          else
            s = txt;
          varArr.push(s);
        }
      );
      if (varArr.length > 0) {
        const str = varArr.join(' ');
        if (this.srchItemsArr.findIndex(x => {return (x.itemText === str);}) === -1)
          this.srchItemsArr.push(new SearchSuggestItem(false, str));
      }
    }
  }

  onKeyUp(event) {
    if (!(event.keyCode === 13))
      this.srchTextInputStream$.next(event.target.value)
    else
      this.renderer.invokeElementMethod(event.target, 'blur');
  }

  removeSearchItem(item: number) {
    this.searchService.removeSearchItem(this.srchItemsArr[item].itemText);
    this.srchItemsArr.splice(item, 1);
  }

  clearInput(event) {
    if (event)
      event.stopPropagation();
    this.searchService.lastSearch = '';
    this.incSearch();
    this.hostPage.pageMode = PageMode.HomeMode;
    this.inputMode = false;
  }

}
