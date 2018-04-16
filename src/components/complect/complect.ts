import {Component, Input, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {ComponentBase} from '../component-extension/component-base';
import {ActionByProduct} from '../../app/model/action-by-product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

class ComplectOptionItem {
  constructor(
    public title: string,
    public idAction: number,
    public complect: string,
    public secondProductActionPrice: number,
    public secondProductRegularPrice: number,
    public secondProductImgUrl: string,
    public secondProductName: string,
    public secondProductId: number,
    public mainProductActionPrice?: number,
    public mainProductRegularPrice?: number
  ){}
}

class ComplectItem {
  _selIndex: number = 0;

  constructor(
    public actionType: number,
    public idGroup: number,
    public variants: ComplectOptionItem[]
  ){}

  set selIndex(value: number) {
    if (value+1 > this.variants.length) {
      this._selIndex = 0;
      return;
    }

    if (value+1 <= 0) {
      this._selIndex = this.variants.length-1;
      return;
    }

    this._selIndex = value;
  }

  get selIndex(): number {
    return this._selIndex;
  }

}

@Component({
  selector: 'complect',
  templateUrl: 'complect.html'
})
export class ComplectComponent extends ComponentBase {

  private _actionsArr: Array<ActionByProduct>;

  @ViewChild('slides') slides: Slides;

  complectAgg: Array<ComplectItem> = [];

  mainProdImgUrl: string;
  mainProdName: string;
  private _actionsBinded = false;
  private _productBinded = false;


  @Input()
  set actionsArr(value: Array<ActionByProduct>) {
    this._actionsArr = value;
    this._actionsBinded = true;
    this.initData();
  }

  get actionsArr(): Array<ActionByProduct> {
    return this._actionsArr;
  }

  private _mainProductId: number;

  @Input()
  set mainProductId (value: number) {
    this._mainProductId = value;
    this._productBinded = true;
    this.initData();
  }

  get mainProductId(): number {return this._mainProductId};

  constructor(private repo: AbstractDataRepository, public navCtrl: NavController) {
    super();
  }

  initData(): void {
    if (!(this._actionsBinded) || !(this._productBinded)) return;
    if (this.actionsArr.length === 0) return;

    const mainProdEl = this.actionsArr.find(x => x.idProduct === this.mainProductId);
    this.mainProdImgUrl = mainProdEl.imgUrl;
    this.mainProdName = mainProdEl.productName;


    this.actionsArr.forEach(
      x => {
        if (
            (x.idProduct !== this.mainProductId)
            &&
            (this.complectAgg.findIndex(y => ((y.actionType === x.actionType) && (y.idGroup === x.idGroup))) === -1)
           )
          {
            this.complectAgg.push(new ComplectItem(x.actionType, x.idGroup, new Array<ComplectOptionItem>()));
          }
      }
    );

    this.complectAgg.sort((x,y) => {return (y.idGroup - x.idGroup);});

    this.complectAgg.forEach(x => {
      let ga = this.actionsArr.filter(y => ((y.idGroup === x.idGroup) && (y.actionType === x.actionType) && (y.idProduct !== this.mainProductId)));
      ga.forEach(z => {
        let mp = this.actionsArr.filter(g => (g.complect === z.complect) && (g.idProduct === this.mainProductId))[0];
        x.variants.push(new ComplectOptionItem(z.title, z.actionId, z.complect, z.actionPrice, z.regularPrice,
                                        z.imgUrl, z.productName, z.idProduct, mp.actionPrice, mp.regularPrice));
      });

    });

  }

  scrollOptions(item: ComplectItem, distance: number): void {
    item.selIndex = item.selIndex + distance;
  }

  getRegularPrice(item: ComplectItem) {
    return item.variants[item.selIndex].mainProductRegularPrice + item.variants[item.selIndex].secondProductRegularPrice;
  }

  getActionPrice(item: ComplectItem) {
    if (item.actionType === 4)
      return item.variants[item.selIndex].mainProductActionPrice+item.variants[item.selIndex].secondProductActionPrice;
    if (item.actionType === 5)
      return item.variants[item.selIndex].mainProductRegularPrice;
  }

  getUSaveAmt(item: ComplectItem) {
    return this.getRegularPrice(item) - this.getActionPrice(item);
  }

  async viewProduct(item: ComplectItem) {
    let prod = await this.repo.getProductById(item.variants[item.selIndex].secondProductId);
    this.navCtrl.push('ItemDetailPage', {prod: prod, loadQuotes: true});
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
}
