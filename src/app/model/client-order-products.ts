import {Quotation, Product} from './index';
import {AbstractDataRepository} from '../service/index';
import {RefInjector, LazyLoad, IDTO} from '../core/app-core';
import {QuotationProduct} from './quotation-product';
import {StorePlace} from './store-place';
import {ClientOrderProductsDTO} from './DTO/client-order-products-dto';

@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationProductById', params: ['idQuotationProduct']},
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']}
])

/*
export class ClientOrderProducts extends ClientOrderProductsDTO {
  private _repo: AbstractDataRepository;


  constructor ( ){
    super();
    this._repo = RefInjector.pull(AbstractDataRepository);
  }


}
*/


export class ClientOrderProducts implements IDTO {
  private _repo: AbstractDataRepository;

  get dto(): any {
    return  {id: this.id, idOrder: this.idOrder, idQuotationProduct: this.idQuotationProduct, price: this.price,
      idStorePlace: this.idStorePlace, idLoEntity: this.idLoEntity, loTrackTicket: this.loTrackTicket,
      loDeliveryCost: this.loDeliveryCost, loDeliveryCompleted: this.loDeliveryCompleted,
      loEstimatedDeliveryDate: this.loEstimatedDeliveryDate, loDeliveryCompletedDate: this.loDeliveryCompletedDate,
      errorMessage: this.errorMessage};
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
    public errorMessage?: string
  ){ this._repo = RefInjector.pull(AbstractDataRepository) }


}
