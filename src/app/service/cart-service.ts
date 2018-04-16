import {Injectable, Injector, OnDestroy} from '@angular/core';
import {ClientOrder} from '../model/client-order';
import {ClientOrderProducts} from '../model/client-order-products';
import {QuotationProduct} from '../model/quotation-product';
import {StorePlace} from '../model/store-place';
import {UserService} from './bll/user-service';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import {EventService} from './event-service';
import {AlertController, App} from 'ionic-angular';
import {PersonInfo} from '../model/person';
import {CreditCalc} from '../model/credit-calc';
import {AppConstants} from '../app-constants';
import {AbstractLocalizationRepository} from "./repository/abstract/abstract-localization-repository";
import {IDictionary} from "../core/app-core";
import {CurrencyStore} from "./repository/specific/currency-store.service";


export class LoDeliveryOption {
  public idClientOrderProduct?: number;
  public itemIdx?: number;
  public loEntityId?: number;
  public deliveryDate?: Date;
  public deliveryCost?: number;
  public loName?: string;
  public isChecked?: boolean;

  constructor(){};
}

@Injectable()
export class CartService {

  public lastItemCreditCalc: ClientOrderProducts = null;
  private cKey = 'cartItems';
  public order: ClientOrder = null;
  public orderProducts: Array<ClientOrderProducts> = [];
  public loDeliveryOptions: Array<LoDeliveryOption>=[];
  public loResultDeliveryOptions: Array<LoDeliveryOption>=[];
  min_loan_amt = 0;
  max_loan_amt = 0;
  //public pmtMethod: EnumPaymentMethod = null;

  public loan: CreditCalc = null;

  public bonus: number = null;
  private _payByPromoBonus = false;

  public _promoCode: string;
  public promocodeInvalid = false;

  //Текущие доступные бонусы клиента
  public availBonus: number;
  public availPromoBonus: number;

  public cartValidationNeeded = false;
  public person = new PersonInfo();

  private localization: IDictionary<string> = {};

  constructor(public userService: UserService, public repo: AbstractDataRepository,
              public evServ: EventService, private app: App, private locRepo: AbstractLocalizationRepository,
              public alertCtrl: AlertController, private currStoreService: CurrencyStore) {

    this.evServ.events['logonEvent'].subscribe(() => {
        this.initCart().then (() => {
            this.localeCartService();
/*

            if ((this.cartValidationNeeded) && (this.cartErrors)) {
              this.navCtrl = app.getActiveNav();
              console.log(this.navCtrl);
              const startIndex = this.navCtrl.getActive().index - 1;
              this.navCtrl.remove(startIndex, 2);
              this.navCtrl.push('CartPage');
            };
            this.cartValidationNeeded = false;
*/

        }
        );
      }
    );

    this.evServ.events['logOffEvent'].subscribe(() => {
      this.orderProducts = [];
      this.initCart();
      }
    );

    this.evServ.events['cartUpdateEvent'].subscribe(() => {
        this.calculateCart();
      }
    );
    locRepo.setLocalization();

    repo.loadPmtMethodsCache();
    repo.loadRegionsCache();
    repo.loadStorePlaceCache();
    repo.loadSuppliersCache();
    //repo.loadCityCache();
    repo.loadMeasureUnitCache();
    repo.getCountries(); //<--- this loads countries cache
    repo.getManufacturers(true); //<--- this loads manufacturers cache

    this.initCart();

    this.localeCartService();

    this.currStoreService.initCurrencyRate();
  }

  public async calculateCart(){
    let calcRes = await this.repo.calculateCart(
                  this.promoCode, this.bonus, this.payByPromoBonus,
      ((this.loan) && (this.loan.creditProduct) && (this.order.idPaymentMethod === 3)) ? this.loan.creditProduct.sId : null,
                  this.orderProducts);

    for (let i of calcRes) {
      let _found = false;
      let _prod: ClientOrderProducts = null;

      for (let _p of this.orderProducts) {
        if (_p.id === i.clOrderSpecProdId) {
          _prod = _p;
          _found = true;
          break;
        }
      }
      if (_found) {
        _prod.payBonusCnt = i.bonusDisc;
        _prod.payPromoCodeDiscount = i.promoCodeDisc;
        _prod.payPromoBonusCnt = i.promoBonusDisc;
        _prod.earnedBonusCnt = i.earnedBonus;
//        await this.repo.saveCartProduct(_prod);
      }

    }

    this.calcLoan();
  }

  public emptyCart(): void {
    this.lastItemCreditCalc = null;
    this.order = null;
    this.orderProducts = [];
    this.loDeliveryOptions = [];
    this.loResultDeliveryOptions = [];
    this.loan = null;
    this.bonus  = null;
    this._payByPromoBonus = false;
    this._promoCode = null;
    this.promocodeInvalid = false;
    this.availBonus = null;
    this.availPromoBonus = null;
    this.cartValidationNeeded = false;
  }

  public get promoCode(): string {
    return this._promoCode;
  }

  public set promoCode (val: string)  {
    this._promoCode = val;
    if (!val)
      this.evServ.events['cartUpdateEvent'].emit();
  }

  public get payByPromoBonus(): boolean {
    return this._payByPromoBonus;
  }

  public set payByPromoBonus(val: boolean) {
    this._payByPromoBonus = val;
    this.evServ.events['cartUpdateEvent'].emit();
  }

  calcLoan() {
    if ((this.order.idPaymentMethod === 3) && (this.loan)) {
      let cObj = this.loan;

      cObj.clMonthAmt = this.calculateLoan(this.cartGrandTotal, cObj.clMonths,
        cObj.creditProduct.monthCommissionPct, cObj.creditProduct.sGracePeriod);
    }
  }

  public get itemsBonusDisc(): number {
    let _res = 0;
    this.orderProducts.forEach(i => {
      _res += i.payBonusCnt*i.qty;
    });
    if (this.order)
      this.order.bonusTotal = _res;
    return _res;
  }

  public get promoCodeDiscount(): number {
    let _res = 0;
    this.orderProducts.forEach(i => {
      _res += i.payPromoCodeDiscount*i.qty;
    });
    if (this.order)
      this.order.promoCodeDiscTotal = _res;
    return _res;
  }

  public get itemsPromoBonusDisc(): number {
    let _res = 0;
    this.orderProducts.forEach(i => {
      _res += i.payPromoBonusCnt*i.qty;
    });
    if (this.order)
      this.order.promoBonusTotal = _res;
    return _res;
  }

  public get shippingCost(): number {
    let res = 0;
    this.loResultDeliveryOptions.forEach(i => {
        res += i.deliveryCost;
      }
    );
    if (this.order)
      this.order.shippingTotal = res;
    return res;
  }

  public get itemsTotal(): number {
    let _s = 0;
    if (this.orderProducts) {
      this.orderProducts.forEach(item => {
        _s += item.price*item.qty
      });
    }
    if (this.order)
      this.order.itemsTotal = _s;
    return _s;
  }

  public get cartGrandTotal(): number {
    return +(this.orderTotal - this.promoCodeDiscount
              - this.itemsBonusDisc - this.itemsPromoBonusDisc).toFixed(2);
  }

  public async initBonusData() {
    let cl = await (<any>this.userService).profile.client_p;
    let bonusData = await this.repo.getBonusesInfo( 11049778713/*cl.id*/); //TODO

    this.availBonus = (bonusData.bonusLimit) ? bonusData.bonusLimit : 0;
    this.availPromoBonus = (bonusData.actionBonusLimit) ? bonusData.actionBonusLimit : 0;
  }

  public get mostExpensiveItem(): ClientOrderProducts {
    if (this.orderProducts.length === 0)
      return null;
    let item: ClientOrderProducts = this.orderProducts[0];
    this.orderProducts.forEach(i => {
        if (i.price > item.price)
          item = i;
      }
    );
    return item;
  }

  calculateLoan(amount: number, months: number, monthsCommissPct: number, grace: number): number {
    let _gr = (grace) ? grace : 0;
    let _am = (amount) ? amount : 0;
    let _com = (monthsCommissPct) ? monthsCommissPct : 0;
    return Math.ceil((_am + (_am * _com / 100 * (months - _gr))) / months);
  }

  validateLoan (loanAmt: number): {isValid:boolean, validationErrors:string[]} {
    let maxLoan = this.localization['MaxLoan'] ? this.localization['MaxLoan'] : 'Максимальный лимит кредита перевышен';
    let minLoan = this.localization['MinLoan'] ? this.localization['MinLoan'] : 'Сумма кредита ниже лимита';
    let errs = [];

    let mes = (loanAmt > this.max_loan_amt) ? maxLoan : null;
    if (mes)
      errs.push(mes);
    mes = (loanAmt < this.min_loan_amt) ? minLoan : null;
    if (mes)
      errs.push(mes);
    return {isValid: !(errs.length > 0), validationErrors: errs};
  }

  async initCart() {
    this.min_loan_amt = parseInt(await this.repo.getAppParam('MAX_LOAN_AMT'));
    this.max_loan_amt = parseInt(await this.repo.getAppParam('MIN_LOAN_AMT'));
    //console.log('CartInit call. Is auth: '+ this.userService.isAuth);
    if (this.userService.isAuth) {
      this.order = await this.repo.getClientDraftOrder();
      if (this.order.idPerson)
        this.person = await this.repo.getPersonById(this.order.idPerson);

      let op = await this.repo.getCartProducts();
      for (let i of this.orderProducts) {
        await this.repo.saveCartProduct(i);
        op.push(i);
      }

      //переключаем корзину на результирующую
      this.orderProducts = op;

      // после переноса содержимого локальной корзины в бекенд - затираем локальную корзину
      localStorage.setItem(this.cKey, null);
    }
    else {
      this.order = null;
      const stor = JSON.parse(localStorage.getItem(this.cKey));
      if (stor) {
        stor.forEach((val) => {
          let spec = new ClientOrderProducts();
          spec.idQuotationProduct = val.idQuotationProduct;
          spec.price = val.price;
          spec.qty = val.qty;
          spec.idStorePlace = val.storePlace;
          this.orderProducts.push(spec);
        });
      }
    }
  }

  public get cartItemsCount(): number {
      let _q = 0;
      if (this.orderProducts)
        this.orderProducts.forEach(item => {
          _q += item.qty;
        });
      return _q;
  }

  public get orderTotal(): number {
    return this.itemsTotal + this.shippingCost;
  }

  async addItem(item: QuotationProduct, qty: number, price: number, storePlace: StorePlace, page: any) {
    if (item && qty && price) {
      const _f = this.orderProducts.filter(i => {return (i.idQuotationProduct === item.id);});
      let foundQuot: ClientOrderProducts = (_f) ? _f[0] : null;

      if (foundQuot) {
        foundQuot.qty += qty;
        foundQuot.price = price;
        this.updateItem(foundQuot);
      } else {
        let orderItem = new ClientOrderProducts();
        orderItem.idQuotationProduct = item.id;
        orderItem.price = price;
        orderItem.qty = qty;
        orderItem.idStorePlace = (storePlace ? storePlace.id : null);

      if (this.userService.isAuth) {
        orderItem = await this.repo.insertCartProduct(orderItem);
      }
      this.orderProducts.push(orderItem);
    }

      this.saveToLocalStorage();
      this.lastItemCreditCalc = null;

      this.evServ.events['cartUpdateEvent'].emit();

      const message = this.localization['AddedToCart'] ? this.localization['AddedToCart'] : 'Товар добавлен в корзину';
      let toast = page.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-message'
      });

      toast.onDidDismiss(() => {
      });

      toast.present();
    } else {
      let message = this.localization['SomethingWrong'] ? this.localization['SomethingWrong'] : 'Что-то пошло не так';
      let toast = page.toastCtrl.create({
        message: message,
        duration: 2500,
        position: 'bottom',
        cssClass: 'toast-message'
      });

      toast.onDidDismiss(() => {
      });

      toast.present();
    }
  }


  saveToLocalStorage() {
    if (!this.userService.isAuth) {

      let saveArr = new Array<any>();
      this.orderProducts.forEach(i => {
          saveArr.push(i.dto);
        }
      );
      localStorage.setItem(this.cKey, JSON.stringify(saveArr));
    }
  }

  async gotoCartPageIfDataChanged() {
    let alert = this.alertCtrl.create({
      title: this.localization['Information'] ? this.localization['Information'] : 'Информация',
      message: this.localization['Message'] ? this.localization['Message'] : 'Товар был удален либо заказ отправлен с другого устройства',
      buttons: [
        {
          text: this.localization['BtnText'] ? this.localization['BtnText'] : 'Перейти в корзину',
          handler: () => {
            this.emptyCart();
            this.initCart().then(() => {
                this.app.getActiveNav().setRoot('CartPage');
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  async updateItem(item: ClientOrderProducts) {
    if (this.userService.isAuth) {
      item = await this.repo.saveCartProduct(item);
      if (!(item)) {
        this.gotoCartPageIfDataChanged();
      }
    }
  }

  async removeItem(itemIndex: number) {
    if (this.userService.isAuth)
      await this.repo.deleteCartProduct(this.orderProducts[itemIndex]);
    this.orderProducts.splice(itemIndex, 1);
    this.saveToLocalStorage();
    this.lastItemCreditCalc = null;
    this.evServ.events['cartUpdateEvent'].emit();
  }

  public get cartErrors(): Array<{idQuotProduct: number, errorMessage: string}> {
    let arr = new Array<any>();
    for (let i of this.orderProducts) {
      if (i.errorMessage) {
        arr.push({idQuotProduct: i.idQuotationProduct, errorMessage: i.errorMessage});
      }
    }
    return (arr.length === 0) ? null : arr;
  }

  // making localization for cart service
  public async localeCartService() {
    let loc = await this.locRepo.getLocalization({componentName: (<any> this).constructor.name, lang: +localStorage.getItem('lang')});
    if (loc && (Object.keys(loc).length !== 0)) {
      this.localization = loc;
    }
  }
}
