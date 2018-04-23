import {AbstractDataRepository} from '../service/index';
import {RefInjector, LazyLoad, IDTO, System} from '../core/app-core';
import {QuotationProduct} from './quotation-product';
import {StorePlace} from './store-place';
import {LoEntity} from './lo-entity';

@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationProductById', params: ['idQuotationProduct']},
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']},
  { options: {constructor: LoEntity}, action: 'getLoEntitiyById', params: ['idLoEntity']}

])

export class ClientOrderProducts implements IDTO {
  private _repo: AbstractDataRepository;

  get dto(): any {
    return  {id: this.id, idOrder: this.idOrder, idQuotationProduct: this.idQuotationProduct, qty: this.qty, price: this.price,
      idStorePlace: this.idStorePlace, idLoEntity: this.idLoEntity, loTrackTicket: this.loTrackTicket,
      loDeliveryCost: this.loDeliveryCost, loDeliveryCompleted: this.loDeliveryCompleted,
      loEstimatedDeliveryDate: this.loEstimatedDeliveryDate, loDeliveryCompletedDate: this.loDeliveryCompletedDate,
      errorMessage: this.errorMessage, warningMessage: this.warningMessage,  payPromoCode: this.payPromoCode,
      payPromoCodeDiscount: this.payPromoCodeDiscount, payBonusCnt: this.payBonusCnt, payPromoBonusCnt: this.payPromoBonusCnt,
      earnedBonusCnt: this.earnedBonusCnt, warningRead: this.warningRead, complect: this.complect, idAction: this.idAction,
      actionTitle: this.actionTitle};
  }

  constructor (
    public id?: number,
    public idOrder?: number,
    public idQuotationProduct?: number,
    public price?: number,
    public qty?: number,
    public idStorePlace?: number,
    public idLoEntity?: number,
    public loTrackTicket?: string,
    public loDeliveryCost?: number,
    public loDeliveryCompleted?: boolean,
    public loEstimatedDeliveryDate?: Date,
    public loDeliveryCompletedDate?: Date,
    public errorMessage?: string,
    public warningMessage?: string,
    public payPromoCode?: string,
    public payPromoCodeDiscount?: number,
    public payBonusCnt?: number,
    public payPromoBonusCnt?: number,
    public earnedBonusCnt?: number,
    public warningRead?: boolean,
    public complect?: string,
    public idAction?: number,
    public actionList?: number,
    public actionTitle?: string
  ){ this._repo = RefInjector.pull(AbstractDataRepository) }


}
