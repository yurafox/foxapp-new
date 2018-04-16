import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import CacheProvider = Providers.CacheProvider;
import {
  QuotationProduct,
  Product,
  Manufacturer,
  ProductPropValue,
  Prop,
  PropEnumList,
  Quotation,
  Supplier,
  Currency,
  ProductReview,
  City,
  Store,
  ProductStorePlace,
  StorePlace,
  Lang,
  Action,
  ActionOffer,
  Client,
  ClientAddress,
  Country,
  ClientOrder,
  ClientOrderProducts,
  StoreReview,
  LoEntity,
  LoSupplEntity,
  EnumPaymentMethod,
  Novelty,
  NoveltyDetails,
  DeviceData,
  ReviewAnswer,
  Poll,PollQuestion,PollQuestionAnswer,
  ClientPollAnswer, CreditProduct, ClientBonus, PersonInfo,
  LoTrackLog,
  Category,
  MeasureUnit,
  Region,
  BannerSlide,
  ClientMessage,
  CurrencyRate,
  ActionByProduct
} from '../../../model/index';

import { AbstractDataRepository } from '../../index';
import {IDictionary, Providers } from '../../../core/app-core';
import {ConnectivityService} from '../../connectivity-service';
import {AppParam} from '../../../model/app-param';
import IKeyedCollection = Providers.IKeyedCollection;
import {OrdersFilter} from '../../../../pages/your-orders/your-orders';

// <editor-fold desc="url const">
//PRODUCTION URLS
const productDescriptionsUrl = `${AppConstants.BASE_URL}/api/product/getProductDescription`;
const productsUrl = `${AppConstants.BASE_URL}/api/product`;
const currenciesUrl = `${AppConstants.BASE_URL}/api/currency`;
const manufacturersUrl = `${AppConstants.BASE_URL}/api/manufacturer`;
const quotationProductsUrl = `${AppConstants.BASE_URL}/api/quotationproduct`;
const suppliersUrl = `${AppConstants.BASE_URL}/api/supplier`;
const measureUnitUrl = `${AppConstants.BASE_URL}/api/measureUnit`;
const LangUrl = `${AppConstants.BASE_URL}/api/localization/lang`;
const countriesUrl = `${AppConstants.BASE_URL}/api/geo/country`;
const citiesUrl = `${AppConstants.BASE_URL}/api/geo/city`;
const regionsUrl = `${AppConstants.BASE_URL}/api/geo/region`;
const getPaymentMethodsUrl = `${AppConstants.BASE_URL}/api/fin/pmtmethod`;
const loEntitiesUrl = `${AppConstants.BASE_URL}/api/lo/loentity`;
const quotationsUrl = `${AppConstants.BASE_URL}/api/quotation`;
const clientsUrl = `${AppConstants.BASE_URL}/api/client`;
const cartProductsUrl = `${AppConstants.BASE_URL}/api/cart/CartProducts`;
const productStorePlacesUrl = `${AppConstants.BASE_URL}/api/storeplace/productstoreplaces`;
const storePlacesUrl = `${AppConstants.BASE_URL}/api/storeplace/storeplace`;
const loSupplEntitiesUrl = `${AppConstants.BASE_URL}/api/lo/losupplentity`;
const specLOTrackingLogUrl = `${AppConstants.BASE_URL}/api/lo/specLOTrackingLog`;
const clientDraftOrderUrl = `${AppConstants.BASE_URL}/api/Cart/ClientDraftOrder`;
const personsUrl = `${AppConstants.BASE_URL}/api/client/person`;
const productImagesUrl = `${AppConstants.BASE_URL}/api/product/getProductImages`;
const getBonusesInfoUrl = `${AppConstants.BASE_URL}/api/client/getBonusesInfo`;
const getClientBonusesExpireInfoUrl = `${AppConstants.BASE_URL}/api/client/GetBonusesExpireInfo`;
const creditProductsUrl = `${AppConstants.BASE_URL}/api/credit/creditproduct`;
const productSupplCreditGradesUrl = `${AppConstants.BASE_URL}/api/credit/GetProductCreditSize`;
const postProductViewUrl = `${AppConstants.BASE_URL}/api/client/LogProductView`;
const clientAddressesUrl = `${AppConstants.BASE_URL}/api/client/clientAddress`;
const clientOrderSpecProductsUrl = `${AppConstants.BASE_URL}/api/Cart/GetCartProductsByOrderId`;
const clientOrdersUrl = `${AppConstants.BASE_URL}/api/Cart/clientOrder`;
const citiesWithStoresUrl = `${AppConstants.BASE_URL}/api/geo/citiesWithStores`;
const getDeliveryCostUrl = `${AppConstants.BASE_URL}/api/lo/GetDeliveryCost`;
const getDeliveryDateUrl = `${AppConstants.BASE_URL}/api/lo/GetDeliveryDate`;
const calculateCartUrl = `${AppConstants.BASE_URL}/api/cart/calculateCart`;
const postOrderUrl = `${AppConstants.BASE_URL}/api/cart/postOrder`;
const pollsUrl=`${AppConstants.BASE_URL}/api/poll`;
const clientPollAnswersUrl = `${AppConstants.BASE_URL}/api/poll/ClientPollAnswer`;
const pollQuestionUrl=`${AppConstants.BASE_URL}/api/poll/pollQuestions`;
const pollQuestionAnswerUrl = `${AppConstants.BASE_URL}/api/poll/pollAnswers`;
const pagesDynamicUrl = `${AppConstants.BASE_URL}/api/page`;
const actionDynamicUrl = `${AppConstants.BASE_URL}/api/action`;
const storesUrl = `${AppConstants.BASE_URL}/api/storeplace/stores`;
const productReviewsUrl = `${AppConstants.BASE_URL}/api/reviews/GetProductReviews`;
const storeReviewsUrl = `${AppConstants.BASE_URL}/api/reviews/GetStoreReviews`;
const storeReviewsByStoreIdUrl = `${AppConstants.BASE_URL}/api/reviews/GetStoreReviewsByStoreId`;
const noveltyByIdDynamicUrl = `${AppConstants.BASE_URL}/api/novelty/GetNoveltyById`;
const noveltiesDynamicUrl = `${AppConstants.BASE_URL}/api/novelty/GetNovelties`;
const noveltyDetailsDynamicUrl = `${AppConstants.BASE_URL}/api/novelty/GetNoveltyDetailsByNoveltyId`;
const favoriteStoresUrl = `${AppConstants.BASE_URL}/api/storeplace/FavoriteStores`;
const deviceDataUrl = `${AppConstants.BASE_URL}/api/DeviceData`;
const bannerSlidesUrl = `${AppConstants.BASE_URL}/api/BannerSlides`;
const clientMessageUrl = `${AppConstants.BASE_URL}/api/ClientMessage`;
const postProductReviewUrl = `${AppConstants.BASE_URL}/api/SaveReview/Product`;
const postStoreReviewUrl = `${AppConstants.BASE_URL}/api/SaveReview/Store`;
const updateProductReviewUrl = `${AppConstants.BASE_URL}/api/UpdateReview/Product`;
const updateStoreReviewUrl = `${AppConstants.BASE_URL}/api/UpdateReview/Store`;
const appParamsUrl = `${AppConstants.BASE_URL}/api/appparams`;
const clientOrderDatesRangeUrl = `${AppConstants.BASE_URL}/api/client/OrderDatesRanges`;
const clientOrderProductsByDateUrl = `${AppConstants.BASE_URL}/api/cart/ClientOrderProductsByDate`;
const getCurrencyRate = `${AppConstants.BASE_URL}/api/currency/rate`;
const getActionsByProductUrl = `${AppConstants.BASE_URL}/api/action/GetProductActions`;
//DEV URLS
// const productDescriptionsUrl = 'api/mproductDescriptions';
// const currenciesUrl = "/api/mcurrencies";
// const productsUrl = "/api/mproducts";
// const manufacturersUrl = "/api/manufacturers";
// const quotationProductsUrl = "/api/mquotationProducts";
// const suppliersUrl = "/api/msuppliers";
// const mYeasureUnitUrl = '/api/mmeasureUnits';
// const LangUrl = "/api/mlocalization";
// const countriesUrl = "/api/mcountries";
// const citiesUrl = "/api/mcities";
// const regionsUrl = "/api/mregions";
// const getPaymentMethodsUrl = "/api/mpaymentMethods";
// const loEntitiesUrl = "/api/mloEntities";
// const quotationsUrl = "/api/mquotation";
// const clientsUrl = "/api/mclients";
// const cartProductsUrl = "/api/mcartProducts";
// const productStorePlacesUrl = "/api/mproductStorePlaces";
// const storePlacesUrl = "/api/mstorePlaces";
// const loSupplEntitiesUrl = "/api/mloSupplEntities";
// const specLOTrackingLogUrl = '/api/mspecLOTrackingLog';
// const clientDraftOrderUrl = "/api/mclientDraftOrder";
// const personsUrl = "/api/mpersons";
// const productImagesUrl = "/api/mProductImages";
// const getBonusesInfoUrl = "/api/mgetBonusesInfoForCheckout";
// const getClientBonusesExpireInfoUrl = "/api/mclientBonuses";
// const creditProductsUrl = "/api/mcreditProducts";
// const productSupplCreditGradesUrl = "/api/mproductSupplCreditGrades";
// const postProductViewUrl = "/api/mpostProductView";
// const clientAddressesUrl = "/api/mclientAddresses";
// const clientOrderSpecProductsUrl = "/api/mclientOrderSpecProducts";
// const clientOrdersUrl = "/api/mclientOrders";
// const citiesWithStoresUrl = "/api/mcities";
// const storesUrl = "/api/mstores";
// const getDeliveryCostUrl = "/api/mgetDeliveryCost";
// const getDeliveryDateUrl = "/api/mgetDeliveryDate";
// const calculateCartUrl = "/api/mcalculateCart";
// const productReviewsUrl = "/api/mproductReviews";
// const storeReviewsUrl = "/api/mstoreReviews";
// const noveltyDynamicUrl = "/api/mnovelties";
// const noveltyDetailsDynamicUrl = "/api/mnoveltyDetails";
// const deviceDataUrl = "/api/mdeviceData";

const actionOffersUrl = "/api/mactionOffers";

const categoriesUrl = AppConstants.USE_PRODUCTION ? `${AppConstants.BASE_URL}/api/catalog`:"/api/mcategories";

// </editor-fold

@Injectable()
export class AppDataRepository extends AbstractDataRepository {
  private cache: CacheProvider = new CacheProvider();

  constructor(private http: Http, private connServ: ConnectivityService) {
    super();
  }

  public async getClientBonusesExpireInfo(clientId: number): Promise <ClientBonus[]> {
    try {
      const response = await this.http
        .get(getClientBonusesExpireInfoUrl,RequestFactory.makeSearch([
          {key: "clientId", value: clientId.toString()}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr = new Array<ClientBonus>();
      if (data != null) {
        data.forEach(val =>
          arr.push(new ClientBonus(val.id,val.clientId, val.bonus, val.dueDate))
          );
      }
      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postProductView(idProduct: number, params: string) {
    try {
      const response = await this.http
        .post(postProductViewUrl, {idProduct: idProduct.toString(), params: params, },
        RequestFactory.makeAuthHeader()).toPromise();

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async calculateCart(promoCode: string, maxBonusCnt: number, usePromoBonus: boolean, creditProductId: number,
                             cartContent: ClientOrderProducts[]):
      Promise<{clOrderSpecProdId: number, promoCodeDisc: number, bonusDisc: number, promoBonusDisc: number,
               earnedBonus: number}[]>
  {
    try {
      let _dtoContent = [];
      cartContent.forEach(i => {
          _dtoContent.push(i.dto);
        }
      );

      const response = await this.http
        .post(calculateCartUrl, {promoCode: promoCode, maxBonusCnt: maxBonusCnt,
                                      usePromoBonus: usePromoBonus, creditProductId: creditProductId,
                                      cartContent: _dtoContent}
             ,RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      let _res = [];
      if (val) {
        val.forEach(i => {
          _res.push({clOrderSpecProdId: i.clOrderSpecProdId, promoCodeDisc: i.promoCodeDisc,
            bonusDisc: i.bonusDisc, promoBonusDisc: i.promoBonusDisc, earnedBonus: i.earnedBonus});
        });
      }
      return _res;
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async getBonusesInfo(clientId: number): Promise<{ bonusLimit: number, actionBonusLimit: number }> {
    try {
      let _id = clientId.toString();
      const response = await this.http
        .get(getBonusesInfoUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();
      const val = response.json();
      if (response.status == 204)
        return {bonusLimit: 0, actionBonusLimit: 0};
      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      return val;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCreditProducts(): Promise<CreditProduct[]> {
    try {
      const response = await this.http.get(creditProductsUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const minLoanAmt = parseInt(await this.getAppParam('MIN_LOAN_AMT'));
      const maxLoanAmt = parseInt(await this.getAppParam('MAX_LOAN_AMT'));

      const cItems = new Array<CreditProduct>();
      if (data != null) {
        data.forEach(val => {
          let cp = new CreditProduct();
          cp.sId = val.sId;
          cp.sName = val.sName;
          cp.sDefProdId = val.sDefProdId;
          cp.sPartPay = val.sPartPay;
          cp.sGracePeriod = val.sGracePeriod;
          cp.maxTerm = val.maxTerm;
          cp.firstPay = val.firstPay;
          cp.monthCommissionPct = val.monthCommissionPct;
          cp.minAmt = minLoanAmt;
          cp.maxAmt = maxLoanAmt;
          cp.yearPct = val.yearPct;
          cp.kpcPct = val.kpcPct;
          cp.minTerm = val.minTerm;

          cItems.push(cp);
        });
      }
      return cItems;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadPmtMethodsCache() {
    try {
      const response = await this.http.get(getPaymentMethodsUrl,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data.forEach(val => {
            let pmtMethod = new EnumPaymentMethod();
            pmtMethod.id = val.id;
            pmtMethod.name = val.name;
            if (this.isEmpty(this.cache.EnumPaymentMethod.Item(val.id.toString()))) {
              this.cache.EnumPaymentMethod.Add(val.id.toString(), pmtMethod);
            };
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }


  public async getPmtMethods(): Promise<EnumPaymentMethod[]> {
    try {
      if (this.cache.EnumPaymentMethod.Count() === 0) {

        const response = await this.http.get(getPaymentMethodsUrl,RequestFactory.makeAuthHeader()).toPromise();
        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const cItems = new Array<EnumPaymentMethod>();
        if (data != null) {
          data.forEach(val => {
            cItems.push(new EnumPaymentMethod(val.id, val.name));
          });
        }
        return cItems;
      }
      else
        return this.cache.EnumPaymentMethod.Values();
    }
    catch (err) {
      return await this.handleError(err);
    }

  }

  public async getPmtMethodById(id: number): Promise<EnumPaymentMethod> {
    try {
      const _id = id.toString();
      const pmtMethod = new EnumPaymentMethod();
      if (this.isEmpty(this.cache.EnumPaymentMethod.Item(_id))) {
        const response = await this.http
          .get(getPaymentMethodsUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        if (data)
        {
          pmtMethod.id = data.id;
          pmtMethod.name = data.name;
          this.cache.EnumPaymentMethod.Add(_id, pmtMethod);
        }
        return pmtMethod;
      }
      else
      {
        return this.cache.EnumPaymentMethod.Item(_id);
      };
    }
    catch (err) {
      return await this.handleError(err);
    }
  }


  public async getDeliveryDate(order: ClientOrderProducts, loEntityId: number, loIdClientAddress: number): Promise<Date> {
    try {
      const response = await this.http
        .post(getDeliveryDateUrl, {order: order.dto, loEntity: loEntityId, loIdClientAddress: loIdClientAddress},
          RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.deliveryDate;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getDeliveryCost(order: ClientOrderProducts, loEntityId: number, loIdClientAddress: number): Promise<number> {
    try {
      const response = await this.http
        .post(getDeliveryCostUrl, {order: order.dto, loEntity: loEntityId, loIdClientAddress: loIdClientAddress},
          RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.assessedCost;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductCreditSize(idProduct: number, isSupplier: number): Promise<any> {
    try {
      const response = await this.http
        .get(productSupplCreditGradesUrl,RequestFactory.makeSearch([
          {key: "idProduct", value: idProduct.toString()},
          {key: "idSupplier", value: isSupplier.toString()}
        ]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data[0])
        return {partsPmtCnt: data[0].partsPmtCnt, creditSize: data[0].creditSize}
      else
        return null;

    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLoEntitiyById(entityId: number): Promise<LoEntity> {
    try {
      const id = entityId.toString();
      const loEntity = new LoEntity();
      if (this.isEmpty(this.cache.LoEntity.Item(id))) {
        const response = await this.http
          .get(loEntitiesUrl + `/${entityId}`,RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          loEntity.id = data.id;
          loEntity.name = data.name;
          this.cache.LoEntity.Add(id, loEntity);
        }
        return loEntity;
      }
      else
      {
        return this.cache.LoEntity.Item(id);
      }

    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoTrackLogByOrderSpecId(id: number): Promise<LoTrackLog[]> {
    try {
      const response = await this.http
        .get(specLOTrackingLogUrl,RequestFactory.makeSearch([{key: "idOrderSpecProd", value: id.toString()}]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr = new Array<LoTrackLog>();
      if (data != null) {
        data.forEach(val =>
          arr.push(
            new LoTrackLog(
              val.id,
              val.idOrderSpecProd,
              val.trackDate,
              val.trackString
            )
          )
        );

        arr.sort((x,y) => {
            return (+new Date(y.trackDate) - +new Date(x.trackDate));
          }
        );
      }

      return arr;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoEntitiesForSupplier(supplierId: number): Promise<LoSupplEntity[]> {
    try {
      const response = await this.http
        .get(loSupplEntitiesUrl,RequestFactory.makeSearch([
          {key: "idSupplier", value: supplierId.toString()}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cloSupplEntArr = new Array<LoSupplEntity>();
      if (data != null) {
        data.forEach(val =>
          cloSupplEntArr.push(
            new LoSupplEntity(
              val.id,
              val.idSupplier,
              val.idLoEntity
            )
          )
        );
      }
      return cloSupplEntArr;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async saveClientDraftOrder(order: ClientOrder): Promise<ClientOrder> {
    try {
      const response = await this.http
        .put(clientDraftOrderUrl, order.dto,RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let cClientOrder = new ClientOrder(
          data.id,
          data.orderDate,
          data.idCur,
          data.idClient,
          data.total,
          data.idPaymentMethod,
          data.idPaymentStatus,
          data.idStatus,
          null,
          data.loIdEntity,
          data.loIdClientAddress,
          data.itemsTotal,
          data.shippingTotal,
          data.bonusTotal,
          data.promoBonusTotal,
          data.bonusEarned,
          data.promoCodeDiscTotal,
          data.idPerson
        );
        return cClientOrder;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }

  }

  // Метод должен возвращать 1 обїект - черновой заказ, которьій для каждого клиента может бьіть только в единсвенном єкземпляре.
  // Если чернового заказа в базе нет - то создавать и возвращать его
  public async getClientDraftOrder(): Promise<ClientOrder> {
    try {
      const response = await this.http
        .get(clientDraftOrderUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let cClientOrder = new ClientOrder(
          data.id,
          data.orderDate,
          data.idCur,
          data.idClient,
          data.total,
          data.idPaymentMethod,
          data.idPaymentStatus,
          data.idStatus,
          null,
          data.loIdEntity,
          data.loIdClientAddress,
          data.itemsTotal,
          data.shippingTotal,
          data.bonusTotal,
          data.promoBonusTotal,
          data.bonusEarned,
          data.promoCodeDiscTotal,
          data.idPerson
        );
        return cClientOrder;
      }
      ;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrders(): Promise<ClientOrder[]> {
    try {

      const response = await this.http
        .get(clientOrdersUrl,RequestFactory.makeSearch([
          {key: "idClient", value: "100"},
          {key: "idStatus", value: "1"}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cClientOrders = new Array<ClientOrder>();
      if (data != null) {
        data.forEach(val =>
          cClientOrders.push(
            new ClientOrder(
              val.id,
              val.orderDate,
              val.idCur,
              val.idClient,
              val.total,
              val.idPaymentMethod,
              val.idPaymentStatus,
              val.idStatus,
              null,
              val.loIdEntity,
              val.loIdClientAddress,
              val.itemsTotal,
              val.shippingTotal,
              val.bonusTotal,
              val.promoBonusTotal,
              val.bonusEarned,
              val.promoCodeDiscTotal,
              val.idPerson
            )
          )
        );
      };
      return cClientOrders;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderById(orderId: number): Promise<ClientOrder> {
    try {

      const response = await this.http
        .get(clientOrdersUrl + `/${orderId}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
            return new ClientOrder(
              data.id,
              data.orderDate,
              data.idCur,
              data.idClient,
              data.total,
              data.idPaymentMethod,
              data.idPaymentStatus,
              data.idStatus,
              null,
              data.loIdEntity,
              data.loIdClientAddress,
              data.itemsTotal,
              data.shippingTotal,
              data.bonusTotal,
              data.promoBonusTotal,
              data.bonusEarned,
              data.promoCodeDiscTotal,
              data.idPerson
            );
      };
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async postOrder(order: ClientOrder): Promise<{isSuccess: boolean, errorMessage: string}> {
    try {
      const response = await this.http
        .put(postOrderUrl, order.dto,RequestFactory.makeAuthHeader()).toPromise();
      const val = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return {isSuccess: val.isSuccess, errorMessage: val.errorMessage};
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async insertCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts> {
    try {
      const response = await this.http
        .post(cartProductsUrl, prod.dto,RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
      let p = new ClientOrderProducts();
      p.id = val.id;
      p.idOrder = val.idOrder;
      p.idQuotationProduct = val.idQuotationProduct;
      p.price = val.price;
      p.qty = val.qty;
      p.idStorePlace = val.idStorePlace;
      p.idLoEntity = val.idLoEntity;
      p.loTrackTicket = val.loTrackTicket;
      p.loDeliveryCost = val.loDeliveryCost;
      p.loDeliveryCompleted = val.loDeliveryCompleted;
      p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
      p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
      p.errorMessage = val.errorMessage;
      p.warningMessage = val.warningMessage;
      p.warningRead = val.warningRead;
      return p;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts> {
    try {
      const response = await this.http
        .put(cartProductsUrl, prod.dto,RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let p = new ClientOrderProducts();
      p.id = val.id;
      p.idOrder = val.idOrder;
      p.idQuotationProduct = val.idQuotationProduct;
      p.price = val.price;
      p.qty = val.qty;
      p.idStorePlace = val.idStorePlace;
      p.idLoEntity = val.idLoEntity;
      p.loTrackTicket = val.loTrackTicket;
      p.loDeliveryCost = val.loDeliveryCost;
      p.loDeliveryCompleted = val.loDeliveryCompleted;
      p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
      p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
      p.errorMessage = val.errorMessage;
      p.warningMessage = val.warningMessage;
      p.warningRead = val.warningRead;
      return p;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async deleteCartProduct(prod: ClientOrderProducts) {
    try {
      const response = await this.http
        .delete(cartProductsUrl + `/${prod.id}`,RequestFactory.makeAuthHeader())
        .toPromise();
      if (response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCartProducts(): Promise<ClientOrderProducts[]> {
    try {
      const response = await this.http.get(cartProductsUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cClientOrderProducts = new Array<ClientOrderProducts>();
      if (data != null) {
        data.forEach(val => {
          let p = new ClientOrderProducts();
          p.id = val.id;
          p.idOrder = val.idOrder;
          p.idQuotationProduct = val.idQuotationProduct;
          p.price = val.price;
          p.qty = val.qty;
          p.idStorePlace = val.idStorePlace;
          p.idLoEntity = val.idLoEntity;
          p.loTrackTicket = val.loTrackTicket;
          p.loDeliveryCost = val.loDeliveryCost;
          p.loDeliveryCompleted = val.loDeliveryCompleted;
          p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
          p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
          p.errorMessage = val.errorMessage;
          p.warningMessage = val.warningMessage;
          p.payPromoCode = val.payPromoCode;
          p.payPromoCodeDiscount = val.payPromoCodeDiscount;
          p.payBonusCnt = val.payBonusCnt;
          p.payPromoBonusCnt = val.payPromoBonusCnt;
          p.earnedBonusCnt = val.earnedBonusCnt;
          p.warningRead = val.warningRead;

          cClientOrderProducts.push(p);
        });
      }
      return cClientOrderProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderProductsByOrderId(orderId: number): Promise<ClientOrderProducts[]> {
    try {
      const response = await this.http
        .get(clientOrderSpecProductsUrl,RequestFactory.makeSearch([
          {key: "idOrder", value: orderId.toString()}
        ])).toPromise();

      let orderProducts = [];
      const val = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      val.forEach(i => {
        let p = new ClientOrderProducts();
        p.id = i.id;
        p.idOrder = i.idOrder;
        p.idQuotationProduct = i.idQuotationProduct;
        p.price = i.price;
        p.qty = i.qty;
        p.idStorePlace = i.idStorePlace;
        p.idLoEntity = i.idLoEntity;
        p.loTrackTicket = i.loTrackTicket;
        p.loDeliveryCost = i.loDeliveryCost;
        p.loDeliveryCompleted = i.loDeliveryCompleted;
        p.loEstimatedDeliveryDate = i.loEstimatedDeliveryDate;
        p.loDeliveryCompletedDate = i.loDeliveryCompletedDate;
        p.errorMessage = i.errorMessage;
        p.payPromoCode = i.payPromoCode;
        p.payPromoCodeDiscount = i.payPromoCodeDiscount;
        p.payBonusCnt = i.payBonusCnt;
        p.payPromoBonusCnt = i.payPromoBonusCnt;
        p.earnedBonusCnt = i.earnedBonusCnt;
        p.warningRead = i.warningRead;
        orderProducts.push(p);
      });
      return orderProducts;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getProductReviewsByProductId(productId: number): Promise<ProductReview[]> {
    try {
      const response = await this.http
        .get(`${productReviewsUrl}/${productId}`,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProductsRevs = new Array<ProductReview>();
      let answers: IDictionary<ReviewAnswer[]> = {};
      if (data != null) {
        data.forEach(val => {
          let substrings = val.reviewDate.toString().split("T");
          let substring1 = substrings[0].slice(0, substrings[0].length);
          let substring2 = substrings[1].slice(0, substrings[1].length - 1);
          let date = substring1 + " " + substring2;
          if (val.idReview && val.idReview !== null) {
            if(!answers[val.idReview.toString()]) {
              answers[val.idReview.toString()] = [];
            }
            answers[val.idReview.toString()].push(new ReviewAnswer(
              val.id,
              val.idReview,
              val.user,
              new Date(date),
              val.reviewText
            ));
          }
        });
        data.forEach(val => {
          let substrings = val.reviewDate.toString().split("T");
          let substring1 = substrings[0].slice(0, substrings[0].length);
          let substring2 = substrings[1].slice(0, substrings[1].length - 1);
          let date = substring1 + " " + substring2;
          if (val.idReview === null) {
            if (answers[val.id.toString()]) {
              qProductsRevs.push(
                new ProductReview(
                  val.id,
                  val.idProduct,
                  val.user,
                  new Date(date),
                  val.reviewText,
                  val.rating,
                  val.advantages,
                  val.disadvantages,
                  val.upvotes,
                  val.downvotes,
                  answers[val.id.toString()]
                )
              )
            } else {
              qProductsRevs.push(
                new ProductReview(
                  val.id,
                  val.idProduct,
                  val.user,
                  new Date(date),
                  val.reviewText,
                  val.rating,
                  val.advantages,
                  val.disadvantages,
                  val.upvotes,
                  val.downvotes,
                  []
                )
              )
            }
          }
        })
      }
      return qProductsRevs;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]> {
    try {
      const response = await this.http
        .get(productStorePlacesUrl,RequestFactory.makeSearch([
          {key: "idQuotationProduct", value: quotId.toString()}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProductsStorePlaces = new Array<ProductStorePlace>();
      if (data != null) {
        for (let val of data) {
          let psp = new ProductStorePlace(
            val.id,
            val.idQuotationProduct,
            val.idStorePlace,
            val.qty
          );

          let sp = await (<any>psp).storeplace_p;
          if (sp.type == 1)
          //select only storeplaces with type of store
            qProductsStorePlaces.push(psp);
        }
      }
      /*
      return qProductsStorePlaces.sort((a, b) =>
        {return ( (<any>a).idStorePlace.storeplace.city.name - (<any>b).idStorePlace.storeplace.city.name)});
*/
      return qProductsStorePlaces;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCountries(): Promise<Country[]> {
    if (this.cache.Country.Count() > 0)
      return this.cache.Country.Values();
    try {
      const response = await this.http.get(countriesUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cCountries = new Array<Country>();
      if (data != null) {
        data.forEach(val => {
          let p = new Country();
          p.id = val.id;
          p.name = val.name;
          cCountries.push(p);
          this.cache.Country.Add(p.id.toString(), p);
        });
      }
      return cCountries;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCountryById(id: number): Promise<Country> {
    if (!id) return null;
    try {
      const _id = id.toString();
      let country = new Country();
      if (this.isEmpty(this.cache.Country.Item(_id))) {
        const response = await this.http
          .get(countriesUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          country.id = data.id;
          country.name = data.name;
          this.cache.Country.Add(_id, country);
          return country;
        }
      }
      else
      {
        return this.cache.Country.Item(_id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientByUserId(id: number): Promise<Client> {
    try {
      const _id = id.toString();
      let client = new Client();
      const response = await this.http
        .get(clientsUrl,RequestFactory.makeSearch([{key: "userId", value: _id}]))
        .toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data = data[0];
        client.id = data.id;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = data.email;
        client.fname = data.fname;
        client.lname = data.lname;
        client.barcode = data.barcode;
        // client.bonusBalance = data.bonusBalance;
        // client.actionBonusBalance = data.actionBonusBalance;
        return client;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientByPhone (phonenum: string ): Promise<Client> {
    try
    {
      let client = new Client();
      const response = await this.http
        .get(clientsUrl,RequestFactory.makeSearch([{key: "phone", value: phonenum}]))
        .toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data = data[0];
        client.id = data.id;
        client.barcode = data.barcode;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = data.email;
        client.fname = data.fname;
        client.lname = data.lname;
        return client;
      }
  } catch (err) {
    return await this.handleError(err);
  }

  }

  public async createClientAddress(address: ClientAddress): Promise<ClientAddress> {
    try {
      const response = await this.http
        .post(clientAddressesUrl, address.dto,RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let clientAddress = new ClientAddress();
        clientAddress.id = data.id;
        clientAddress.idClient = data.idClient;
        clientAddress.idCity = data.idCity;
        clientAddress.zip = data.zip;
        clientAddress.street = data.street;
        clientAddress.lat = data.lat;
        clientAddress.lng = data.lng;
        clientAddress.isPrimary = data.isPrimary;
        clientAddress.idCountry = data.idCountry;
        clientAddress.city = data.city;
        clientAddress.bldApp = data.bldApp;
        clientAddress.recName = data.recName;
        clientAddress.phone = data.phone;
        return clientAddress;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async deleteClientAddress(address: ClientAddress) {
    try {
      const response = await this.http
        .delete(clientAddressesUrl + `/${address.id}`,RequestFactory.makeAuthHeader())
        .toPromise();
      if (response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async saveClientAddress(address: ClientAddress): Promise<ClientAddress> {
    try {
      const response = await this.http
        .put(clientAddressesUrl, address.dto,RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let clientAddress = new ClientAddress();
        clientAddress.id = data.id;
        clientAddress.idClient = data.idClient;
        clientAddress.idCity = data.idCity;
        clientAddress.zip = data.zip;
        clientAddress.street = data.street;
        clientAddress.lat = data.lat;
        clientAddress.lng = data.lng;
        clientAddress.isPrimary = data.isPrimary;
        clientAddress.idCountry = data.idCountry;
        clientAddress.city = data.city;
        clientAddress.bldApp = data.bldApp;
        clientAddress.recName = data.recName;
        clientAddress.phone = data.phone;
        return clientAddress;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }


  public async getClientAddressById(id: number): Promise<ClientAddress> {
    if (!id)
      return Promise.resolve(null);
    try {
      let _id = id.toString();

      const response = await this.http
        .get(clientAddressesUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let clientAddress = new ClientAddress();
        clientAddress.id = data.id;
        clientAddress.idClient = data.idClient;
        clientAddress.idCity = data.idCity;
        clientAddress.zip = data.zip;
        clientAddress.street = data.street;
        clientAddress.lat = data.lat;
        clientAddress.lng = data.lng;
        clientAddress.isPrimary = data.isPrimary;
        clientAddress.idCountry = data.idCountry;
        clientAddress.city = data.city;
        clientAddress.bldApp = data.bldApp;
        clientAddress.recName = data.recName;
        clientAddress.phone = data.phone;
        return clientAddress;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async getClientAddressesByClientId(id: number): Promise<ClientAddress[]> {
    try {
      let _id = id.toString();
      let clientAdresses = new Array<ClientAddress>();

      const response = await this.http
        .get(clientAddressesUrl,RequestFactory.makeSearch([{key: "idClient", value: _id}]))
        .toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        for (let i of data) {
          let clientAddress = new ClientAddress();
          clientAddress.id = i.id;
          clientAddress.idClient = i.idClient;
          clientAddress.idCity = i.idCity;
          clientAddress.zip = i.zip;
          clientAddress.street = i.street;
          clientAddress.lat = i.lat;
          clientAddress.lng = i.lng;
          clientAddress.isPrimary = i.isPrimary;
          clientAddress.idCountry = i.idCountry;
          clientAddress.city = i.city;
          clientAddress.bldApp = i.bldApp;
          clientAddress.recName = i.recName;
          clientAddress.phone = i.phone;
          clientAdresses.push(clientAddress);
        }
        return clientAdresses;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadStorePlaceCache() {
    try {
      const response = await this.http
        .get(storePlacesUrl,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data.forEach(val => {
          let storeplace = new StorePlace();
          storeplace.id = val.id;
          storeplace.name = val.name;
          storeplace.idSupplier = val.idSupplier;
          storeplace.idCity = val.idCity;
          storeplace.zip = val.zip;
          storeplace.address_line = val.address_line;
          storeplace.lat = val.lat;
          storeplace.lng = val.lng;
          storeplace.type = val.type;
          if (this.isEmpty(this.cache.StorePlace.Item(val.id.toString()))) {
            this.cache.StorePlace.Add(val.id.toString(), storeplace);
            };
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getStorePlaceById(id: number): Promise<StorePlace> {
    try {
      const _id: string = id.toString();
      let storeplace = new StorePlace();
      if (this.isEmpty(this.cache.StorePlace.Item(_id))) {
        // http request
        const response = await this.http
          .get(storePlacesUrl + `/${_id}`,RequestFactory.makeAuthHeader())
          .toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          //storeplace = new StorePlace();
          storeplace.id = id;
          storeplace.name = data.name;
          storeplace.idSupplier = data.idSupplier;
          storeplace.idCity = data.idCity;
          storeplace.zip = data.zip;
          storeplace.address_line = data.address_line;
          storeplace.lat = data.lat;
          storeplace.lng = data.lng;
          storeplace.type = data.type;

          // add to cache
          this.cache.StorePlace.Add(_id, storeplace);
        }
        return storeplace;
      } else {
        // </editor-fold>
        return this.cache.StorePlace.Item(_id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadCityCache() {
    try {
      const response = await this.http
        .get(citiesUrl,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data.forEach(val => {
            let city = new City();
            city.id = val.id;
            city.name = val.name;
            city.idRegion = val.idRegion;
            if (this.isEmpty(this.cache.City.Item(val.id.toString()))) {
              this.cache.City.Add(val.id.toString(), city);
            };
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadRegionsCache(){
    try {
      const response = await this.http
        .get(regionsUrl,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data.forEach(val => {
            let region = new Region();
            region.id = val.id;
            region.name = val.name;
            if (this.isEmpty(this.cache.Region.Item(val.id.toString()))) {
              this.cache.Region.Add(val.id.toString(), region);
            };
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }

  }

  public async getRegionById(id: number): Promise<Region> {
    if (!id) return null;
    try {
      const region: Region = new Region();
      const _id: string = id.toString();
      //let city = null;
      if (this.isEmpty(this.cache.Region.Item(_id))) {
        // http request
        const response = await this.http.get(regionsUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          region.id = id;
          region.name = data.name;

          // add to cache
          this.cache.Region.Add(_id, region);
        }
        return region;
      } else {
        // </editor-fold>
        return this.cache.Region.Item(_id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getRegions(): Promise<Region[]> {
    try {
      const response = await this.http.get(regionsUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const regions = new Array<Region>();
      if (data != null) {
        data.forEach(val => {
          const regionItem: Region = new Region(val.id, val.name);
          regions.push(regionItem);
        });
      }
      return regions;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCityById(id: number): Promise<City> {
    if (!id) return null;
    try {
      const city: City = new City();
      const _id: string = id.toString();
      //let city = null;
      if (this.isEmpty(this.cache.City.Item(_id))) {
        // http request
        const response = await this.http.get(citiesUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          city.id = id;
          city.name = data.name;
          city.idRegion = data.idRegion;

          // add to cache
          this.cache.City.Add(_id, city);
        }
        return city;
      } else {
        // </editor-fold>
        return this.cache.City.Item(_id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  search(textToSearch: string, srchVal: string): boolean {
    if (textToSearch && srchVal) {
      let ar = srchVal.toLowerCase().split(" ");
      let i = 0;
      ar.forEach(str => {
        if (!(textToSearch.toLowerCase().indexOf(str) == -1)) {
          i++;
        }
      });
      if (i == ar.length) return true;
    } else return false;
  }

  public async searchProducts(srchString: string): Promise<Product[]> {
    //TODO This method should be implemented in back end in production mode!
    try {
      if (!AppConstants.USE_PRODUCTION) {
          const response = await this.http.get(productsUrl,RequestFactory.makeAuthHeader()).toPromise();
          const data = response.json();
          if (response.status !== 200) {
            throw new Error("server side status error");
          }
          const products = new Array<Product>();

          if (data != null) {
            for (let val of data) {
              let props = new Array<ProductPropValue>();
              if (val.props && val.props.length !== 0) {
                props = this.getPropValuefromProduct(val);
              }

              // create current product
              const productItem: Product = new Product(
                val.id,
                val.name,
                val.price,
                val.oldPrice,
                val.bonuses,
                val.manufacturerId,
                props,
                val.imageUrl,
                val.rating,
                val.recall,
                val.supplOffers,
                val.description,
                val.slideImageUrls,
                val.barcode
              );

              let mnf = await (<any>productItem).manufacturer_p;
              if (
                this.search(mnf.name, srchString) ||
                this.search(productItem.id.toString(), srchString) ||
                this.search(productItem.name, srchString) ||
                this.search(productItem.barcode, srchString)
              ) {
                products.push(productItem);
              }
            }
          }
          return products;
      }
      else
      {
        const response = await this.http
          .get(productsUrl, {
            search: this.createSearchParams([
              {key: "srch", value: srchString}
            ])
          })
          .toPromise();
        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const products = new Array<Product>();

        if (data != null) {
          for (let val of data) {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(
              val.id,
              val.name,
              val.price,
              val.oldPrice,
              val.bonuses,
              val.manufacturerId,
              props,
              val.imageUrl,
              val.rating,
              val.recall,
              val.supplOffers,
              val.description,
              val.slideImageUrls,
              val.barcode
            );
            products.push(productItem);
          }
         return products;
        }
      }
    }
    catch (err)
    {
      await this.handleError(err);
    }
  }

  public async getProducts(urlQuery: string,
                           cacheForce: boolean): Promise<Product[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Products.Count() === 0 || cacheForce === true) {
        const response = await this.http
          .get(productsUrl,RequestFactory.makeSearch([{key: "url", value: urlQuery}]))
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const products = new Array<Product>();
        if (data != null) {
          data.forEach(val => {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(
              val.id,
              val.name,
              val.price,
              val.oldPrice,
              val.bonuses,
              val.manufacturerId,
              props,
              val.imageUrl,
              val.rating,
              val.recall,
              val.supplOffers,
              val.description,
              val.slideImageUrls,
              val.barcode
            );

            products.push(productItem);

            // add product to cashe
            this.cache.Products.Add(productItem.id.toString(), productItem);
          });
        }
        return products;
      } else {
        // </editor-fold>
        return this.cache.Products.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationProductById(qpId: number): Promise<QuotationProduct> {
    try {
      const response = await this.http
        .get(quotationProductsUrl + `/${qpId}`,RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let quotationProduct: QuotationProduct = null;
      if (data != null) {
        quotationProduct = new QuotationProduct(
          data.id,
          data.idQuotation,
          data.idProduct,
          data.price,
          data.maxDeliveryDays,
          data.stockQuant,
          data.stockLow,
          data.freeShipping
        );
      }
      return quotationProduct;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getValueQuotByProduct(id: number): Promise<QuotationProduct> {
    let _qps = await this.getQuotationProductsByProductId(id);
    if (_qps.length === 0)
      return null;

    // Возвращаем предложение с минимальной ценой
    return _qps.sort((x,y) => {
      return (x.price - y.price);
    })
      .find((i) => {return (i.stockQuant > 0)});
  }

  public async getByItAgainQP(originalQP: QuotationProduct): Promise<QuotationProduct> {
    //Если исходный QP все еще актуальный - возвращаем его
    if (originalQP.stockQuant > 0)
      return originalQP;

    //среди текущих предложений продавцов находим предложение того же продавца и возвращаем его
    const _orQuot = await (<any>originalQP).quotation_p;
    const _qps = await this.getQuotationProductsByProductId(originalQP.idProduct);
    let _foundQuot: QuotationProduct = null;
    for (let i of _qps) {
      let _q = await (<any>i).quotation_p;
      if ((_q.idSupplier === _orQuot.idSupplier) && (i.stockQuant > 0)) {
        return _foundQuot;
      }
    }

    // находим valueQuot и возвращаем его
    return await this.getValueQuotByProduct(originalQP.idProduct);
  }

  //TODO при реализации бекенда возвращать в этом методе только те QuotationProducts, по которым остаток > 0
  // и не закрытые (т.е. актуальные на сейчас предложения продавцов, а не позавчерашние)
  public async getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]> {
    try {
      const response = await this.http
        .get(quotationProductsUrl,RequestFactory.makeSearch([
          {key: "idProduct", value: productId.toString()}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        data.forEach(val =>
          qProducts.push(
            new QuotationProduct(
              val.id,
              val.idQuotation,
              val.idProduct,
              val.price,
              val.maxDeliveryDays,
              val.stockQuant,
              val.stockLow,
              val.freeShipping,
              val.actionPrice
            )
          )
        );
      }
      return qProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public getProductFromResponse(data: any): Product {
    if (data != null && data.length !== 0) {
      const prod: Product = new Product();
      let props = new Array<ProductPropValue>();
      if (data.props && data.props.length !== 0) {
        props = this.getPropValuefromProduct(data);
      }
      prod.id = data.id;
      prod.name = data.name;
      prod.price = data.price;
      prod.manufacturerId = data.manufacturerId;
      prod.props = props;
      prod.imageUrl = data.imageUrl;
      prod.rating = data.rating;
      prod.recall = data.recall;
      prod.supplOffers = data.supplOffers;
      prod.description = data.description;
      prod.slideImageUrls = data.slideImageUrls;
      prod.barcode = data.barcode;
      return prod;
    }
    else return null;
  }

  public async getProductById(productId: number): Promise<Product> {
    try {
      const prod: Product = new Product();
      const id: string = productId.toString();
      // <editor-fold desc="id in cache is empty">
      if (this.isEmpty(this.cache.Products.Item(id))) {
        this.cache.Products.Add(id, prod);

        // http request
        const response = await this.http
          .get(productsUrl + `/${id}`,RequestFactory.makeAuthHeader())
          .toPromise();

        // response data binding
        let data: any = response.json();

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        let prod1 = this.getProductFromResponse(data);
        this.cache.Products.Add(id, prod1);
        return prod1;
      } else {
        // </editor-fold>
        return this.cache.Products.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationById(quotationId: number): Promise<Quotation> {
    try {
      let quotation: Quotation = new Quotation();
      const id: string = quotationId.toString();
      if (this.isEmpty(this.cache.Quotation.Item(id))) {
        this.cache.Quotation.Add(id, quotation);

        const response = await this.http
          .get(quotationsUrl + `/${quotationId}`,RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          quotation.id = data.id;
          quotation.idSupplier = data.idSupplier;
          quotation.dateStart = data.dateStart;
          quotation.dateEnd =  data.dateEnd;
          quotation.currencyId = data.currencyId;
          this.cache.Quotation.Add(id, quotation);
        }
        return quotation;
      } else {
        return this.cache.Quotation.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async insertPerson(person: PersonInfo): Promise<PersonInfo> {
    try {
      let p = new PersonInfo();

      const response = await this.http
        .post(personsUrl, person,RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
      if (data != null) {
        p.id = data.id;
        p.firstName = data.firstName;
        p.lastName= data.lastName;
        p.middleName= data.middleName;
        p.passportSeries= data.passportSeries;
        p.passportNum= data.passportNum;
        p.issuedAuthority= data.issuedAuthority;
        p.taxNumber= data.taxNumber;
        p.birthDate= data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async updatePerson(person: PersonInfo): Promise<PersonInfo> {
    try {
      let p = new PersonInfo();

      const response = await this.http
        .put(personsUrl, person,RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        p.id = data.id;
        p.firstName = data.firstName;
        p.lastName= data.lastName;
        p.middleName= data.middleName;
        p.passportSeries= data.passportSeries;
        p.passportNum= data.passportNum;
        p.issuedAuthority= data.issuedAuthority;
        p.taxNumber= data.taxNumber;
        p.birthDate= data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPersonById(personId: number): Promise<PersonInfo> {
    try {
      const _id = personId.toString();
      let p = new PersonInfo();
      const response = await this.http.get(personsUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        p.id = data.id;
        p.firstName = data.firstName;
        p.lastName= data.lastName;
        p.middleName= data.middleName;
        p.passportSeries= data.passportSeries;
        p.passportNum= data.passportNum;
        p.issuedAuthority= data.issuedAuthority;
        p.taxNumber= data.taxNumber;
        p.birthDate= data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadSuppliersCache() {
    try {
      const response = await this.http
        .get(suppliersUrl,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data.forEach(val => {
            let supplier = new Supplier();
            supplier.id = val.id;
            supplier.name = val.name;
            supplier.paymentMethodId = val.paymentMethodId;
            supplier.rating = val.rating;
            supplier.positiveFeedbackPct = val.positiveFeedbackPct;
            supplier.refsCount = val.refsCount;
            if (this.isEmpty(this.cache.Suppliers.Item(val.id.toString()))) {
              this.cache.Suppliers.Add(val.id.toString(), supplier);
            };
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getSupplierById(supplierId: number): Promise<Supplier> {
    try {
      const suppl: Supplier = new Supplier();
      const id: string = supplierId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Suppliers.Item(id))) {
        this.cache.Suppliers.Add(id, suppl);

        const response = await this.http
          .get(suppliersUrl + `/${id}`,RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          suppl.id = data.id;
          suppl.name = data.name;
          suppl.paymentMethodId = data.paymentMethodId;
          suppl.rating = data.rating;
          suppl.positiveFeedbackPct = data.positiveFeedbackPct;
          suppl.refsCount = data.refsCount;
          this.cache.Suppliers.Add(id, suppl);
        }
        return suppl;
      } else {
        // </editor-fold>

        return this.cache.Suppliers.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencyById(currencyId: number): Promise<Currency> {
    try {
      const curr: Currency = new Currency();
      const id: string = currencyId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Currency.Item(id))) {
        this.cache.Currency.Add(id, curr);
        const response = await this.http
          .get(currenciesUrl + `/${id}`,RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          curr.id = data.id;
          curr.shortName = data.shortName;
          this.cache.Currency.Add(id, curr);
        }
        return curr;
      } else {
        // </editor-fold>

        return this.cache.Currency.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getSuppliers(cacheForce: boolean): Promise<Supplier[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Suppliers.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(suppliersUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const suppliers = new Array<Supplier>();
        if (data != null) {
          data.forEach(val => {
            // create current supplier
            const supplierItem: Supplier = new Supplier(
              val.id,
              val.name,
              val.paymentMethodId,
              val.rating,
              val.positiveFeedbackPct,
              val.refsCount
            );

            suppliers.push(supplierItem);

            // add supplier to cashe
            this.cache.Suppliers.Add(supplierItem.id.toString(), supplierItem);
          });
        }
        return suppliers;
      } else {
        // </editor-fold>
        return this.cache.Suppliers.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencies(cacheForce: boolean): Promise<Currency[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Currency.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(currenciesUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const currencies = new Array<Currency>();
        if (data != null) {
          data.forEach(val => {
            // create current currency
            const currencyItem: Currency = new Currency(val.id, val.shortName);
            currencies.push(currencyItem);

            // add currency to cashe
            this.cache.Currency.Add(currencyItem.id.toString(), currencyItem);
          });
        }
        return currencies;
      } else {
        // </editor-fold>
        return this.cache.Currency.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLocale(cacheForce: boolean): Promise<Lang[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Lang.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(LangUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const languages = new Array<Lang>();
        if (data != null) {
          data.forEach(val => {
            // create current currency
            const langItem: Currency = new Lang(val.id, val.name);
            languages.push(langItem);

            // add currency to cashe
            this.cache.Currency.Add(langItem.id.toString(), langItem);
          });
        }
        return languages;
      } else {
        // </editor-fold>
        return this.cache.Lang.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getManufacturerById(manufacturerId: number): Promise<Manufacturer> {
    try {
      const manufacturer: Manufacturer = new Manufacturer();
      const id: string = manufacturerId.toString();
      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Manufacturer.Item(id))) {
        //this.cache.Manufacturer.Add(id, manufacturer);
        const response = await this.http
          .get(manufacturersUrl + `/${id}`,RequestFactory.makeAuthHeader())
          .toPromise();
        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          manufacturer.id = data.id;
          manufacturer.name = data.name;
          this.cache.Manufacturer.Add(id, manufacturer);
        }
        return manufacturer;
      } else {
        // </editor-fold>

        return this.cache.Manufacturer.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getManufacturers(cacheForce: boolean): Promise<Manufacturer[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Manufacturer.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(manufacturersUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const manufacturers = new Array<Manufacturer>();
        if (data != null) {
          data.forEach(val => {
            // create current manufacturer
            const manufacturerItem: Manufacturer = new Manufacturer(
              val.id,
              val.name
            );

            manufacturers.push(manufacturerItem);

            // add manufacturer to cashe
            this.cache.Manufacturer.Add(
              manufacturerItem.id.toString(),
              manufacturerItem
            );
          });
        }
        return manufacturers;
      } else {
        // </editor-fold>
        return this.cache.Manufacturer.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  private handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.checkConnection(error);
    }
  }

  // </editor-fold>
  // <editor-fold desc="url search factory">
  private createSearchParams(params: Array<{ key: string; value: string }>): URLSearchParams {
    const searchParams = new URLSearchParams();
    params.forEach(val => {
      searchParams.set(val.key, val.value);
    });

    return searchParams;
  }

  // </editor-fold>
  // <editor-fold desc="get product prop value from product"
  private getPropValuefromProduct(product: any): Array<ProductPropValue> {
    const props = new Array<ProductPropValue>();
    product.props.forEach(val => {
      let enumVal =
        val.prop_Value_Enum !== null
          ? new PropEnumList(
          val.prop_Value_Enum.id,
          this.getSingleProp(val.prop_Value_Enum.id_Prop),
          val.prop_Value_Enum.name,
          val.prop_Value_Enum.list_Index,
          val.prop_Value_Enum.bit_Index,
          val.prop_Value_Enum.url
          )
          : null;

      props.push(
        new ProductPropValue(
          val.id,
          val.id_Product,
          this.getSingleProp(val.id_Prop),
          val.prop_Value_Str,
          val.prop_Value_Number,
          val.prop_Value_Bool,
          enumVal,
          val.prop_Value_Long,
          val.pVal,
          val.id_Measure_Unit,
          //
          val.idx,
          val.out_bmask
        )
      );
    });

    return props;
  }

  // </editor-fold>
  // <editor-fold desc="get single prop from parent container"
  private getSingleProp(val: any): Prop {
    return new Prop(
      val.id,
      val.name,
      val.prop_type,
      val.is_Multi_Select,
      val.url //,
      //val.predestination,
    );
  }

  // </editor-fold>
  // <editor-fold desc="inspect cache predicate"
  private isEmpty<T>(value: T) {
    return value === undefined;
  }

  // </editor-fold>

  public async getCitiesWithStores(): Promise<City[]> {
    try {
      if (this.cache.CityWithStore.Count() === 0) {
        const response = await this.http.get(citiesWithStoresUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const cities = new Array<City>();
        if (data != null) {
          data.forEach(val => {
            // create current city
            const cityItem: City = new City(val.id, val.name, val.idRegion);
            cities.push(cityItem);
            this.cache.CityWithStore.Add(val.id.toString(),cityItem);
          });
        }
        return cities;
      } else {
        return this.cache.CityWithStore.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async searchCities(srchString: string): Promise<City[]> {
    try {
      const response = await this.http.get(citiesUrl,RequestFactory.makeSearch([
        {key: "srch", value: srchString}
      ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cities = new Array<City>();
      if (data != null) {
        data.forEach(val => {
          // create current city
          const cityItem: City = new City(val.id, val.name, val.idRegion);
          cities.push(cityItem);
        });
      }
      return cities;
    } catch (err) {
      await this.handleError(err);
    }

  }


  public async getCities(): Promise<City[]> {
    try {
      if (this.cache.City.Count() === 0) {
        const response = await this.http.get(citiesUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const cities = new Array<City>();
        if (data != null) {
          data.forEach(val => {
            // create current city
            const cityItem: City = new City(val.id, val.name, val.idRegion);
            cities.push(cityItem);
            this.cache.City.Add(val.id.toString(),cityItem);
          });
        }
        return cities;
      } else {
        return this.cache.City.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStores(): Promise<IDictionary<Store[]>> {
    try {
      if (this.cache.Store.Count() === 0) {
        const response = await this.http.get(storesUrl,RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        let stores: IDictionary<Store[]> = {};
        if (data != null) {
          let storeFiltered = [];
          let cityID: Array<number> = [];
          data.forEach(dataStore => {
            if (!(cityID.indexOf(dataStore.idCity) > -1)) {
              cityID.push(dataStore.idCity);
              storeFiltered = data.filter((value: Store): string => {
                return value.idCity === dataStore.idCity ? dataStore.idCity.toString() : '';
              });
              let storeArr: Store[] = [];
              for (let i = 0; i < storeFiltered.length; i++) {
                let store = storeFiltered[i];
                let position = {lat: store.lat, lng: store.lng};
                if (store.openTime !== null && store.closeTime !== null && store.rating === null && store.idFeedbacks === null) {
                  let s = new Store(store.id, store.idCity, store.address, position, store.openTime, store.closeTime);
                  storeArr.push(s);
                } else if (store.openTime !== null && store.closeTime !== null && store.rating !== null && store.idFeedbacks === null) {
                  let s = new Store(store.id, store.idCity, store.address, position, store.openTime, store.closeTime, store.rating);
                  storeArr.push(s);
                } else if (store.openTime !== null && store.closeTime !== null && store.rating !== null && store.idFeedbacks !== null) {
                  let s = new Store(store.id, store.idCity, store.address, position, store.openTime, store.closeTime, store.rating, store.idFeedbacks);
                  storeArr.push(s);
                } else {
                  let s = new Store(store.id, store.idCity, store.address, position);
                  storeArr.push(s);
                }
              }
              stores[dataStore.idCity.toString()] = storeArr;
              this.cache.Store.Add(dataStore.idCity.toString(),{id: dataStore.idCity.toString(), stores: storeArr});
            }
          });
        }
        return stores;
      } else {
        let stores: IDictionary<Store[]> = {};
        this.cache.Store.Values().forEach(val => {
          stores[val.id.toString()] = val.stores;
        });
        return stores;
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStoreById(id: number): Promise<Store> {
    try {
      const response = await this.http.get(`${storesUrl}/${id}`,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let resultStore: Store;
      if (data != null) {
        let position = {lat: data.lat, lng: data.lng};
        if (data.id === id) {
          if (data.openTime !== null && data.closeTime !== null && data.rating === null && data.idFeedbacks === null) {
            resultStore = new Store(data.id, data.idCity, data.address, position, data.openTime, data.closeTime);
          } else if (data.openTime !== null && data.closeTime !== null && data.rating !== null && data.idFeedbacks === null) {
            resultStore = new Store(data.id, data.idCity, data.address, position, data.openTime, data.closeTime, data.rating);
          } else if (data.openTime !== null && data.closeTime !== null && data.rating !== null && data.idFeedbacks !== null) {
            resultStore = new Store(data.id, data.idCity, data.address, position, data.openTime, data.closeTime, data.rating, data.idFeedbacks);
          } else {
            resultStore = new Store(data.id, data.idCity, data.address, position);
          }
        }
      }
      return resultStore;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStoreReviewsByStoreId(storeId: number): Promise<StoreReview[]> {
    try {
      const response = await this.http
        .get(`${storeReviewsByStoreIdUrl}/${storeId}`,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const storesRevs = new Array<StoreReview>();
      let answers: IDictionary<ReviewAnswer[]> = {};
      if (data != null) {
        data.forEach(val => {
          let substrings = val.reviewDate.toString().split("T");
          let substring1 = substrings[0].slice(0, substrings[0].length);
          let substring2 = substrings[1].slice(0, substrings[1].length - 1);
          let date = substring1 + " " + substring2;
          if (val.idReview && val.idReview !== null) {
            if(!answers[val.idReview.toString()]) {
              answers[val.idReview.toString()] = [];
            }
            answers[val.idReview.toString()].push(new ReviewAnswer(
              val.id,
              val.idReview,
              val.user,
              new Date(date),
              val.reviewText
            ));
          }
        });
        data.forEach(val => {
          let substrings = val.reviewDate.toString().split("T");
          let substring1 = substrings[0].slice(0, substrings[0].length);
          let substring2 = substrings[1].slice(0, substrings[1].length - 1);
          let date = substring1 + " " + substring2;
          if (val.idReview === null) {
            if (answers[val.id.toString()]) {
              storesRevs.push(
                new StoreReview(
                  val.id,
                  val.idStore,
                  val.user,
                  new Date(date),
                  val.reviewText,
                  val.rating,
                  val.advantages,
                  val.disadvantages,
                  val.upvotes,
                  val.downvotes,
                  answers[val.id.toString()]
                )
              )
            } else {
              storesRevs.push(
                new StoreReview(
                  val.id,
                  val.idStore,
                  val.user,
                  new Date(date),
                  val.reviewText,
                  val.rating,
                  val.advantages,
                  val.disadvantages,
                  val.upvotes,
                  val.downvotes,
                  []
                )
              )
            }
          }
        })
      }
      return storesRevs;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getStoreReviews(): Promise<IDictionary<StoreReview[]>> {
    try {
      const response = await this.http
        .get(`${storeReviewsUrl}`,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let reviews: IDictionary<StoreReview[]> = {};
      if (data != null) {
        const storesRevs = new Array<StoreReview>();
        let answers: IDictionary<ReviewAnswer[]> = {};
        let idStore: number = 0;
        data.forEach(val => {
          let substrings = val.reviewDate.toString().split("T");
          let substring1 = substrings[0].slice(0, substrings[0].length);
          let substring2 = substrings[1].slice(0, substrings[1].length - 1);
          let date = substring1 + " " + substring2;
          if (val.idReview && val.idReview !== null) {
            if (!answers[val.idReview.toString()]) {
              answers[val.idReview.toString()] = [];
            }
            answers[val.idReview.toString()].push(new ReviewAnswer(
              val.id,
              val.idReview,
              val.user,
              new Date(date),
              val.reviewText
            ));
          }
        });
        data.forEach(val => {
          idStore = val.idStore;
          let substrings = val.reviewDate.toString().split("T");
          let substring1 = substrings[0].slice(0, substrings[0].length);
          let substring2 = substrings[1].slice(0, substrings[1].length - 1);
          let date = substring1 + " " + substring2;
          if (val.idReview === null) {
            if (answers[val.id.toString()]) {
              storesRevs.push(
                new StoreReview(
                  val.id,
                  val.idStore,
                  val.user,
                  new Date(date),
                  val.reviewText,
                  val.rating,
                  val.advantages,
                  val.disadvantages,
                  val.upvotes,
                  val.downvotes,
                  answers[val.id.toString()]
                )
              )
            } else {
              storesRevs.push(
                new StoreReview(
                  val.id,
                  val.idStore,
                  val.user,
                  new Date(date),
                  val.reviewText,
                  val.rating,
                  val.advantages,
                  val.disadvantages,
                  val.upvotes,
                  val.downvotes,
                  []
                )
              )
            }
          }
        });
        reviews[idStore.toString()] = storesRevs;
      }
      return reviews;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getFavoriteStores(): Promise<Store[]> {
    try {
      const response = await this.http.get(favoriteStoresUrl, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let stores: Store[] = [];
      if (data != null) {
        data.forEach(val => {
          let store = new Store(
            val.id,
            val.idCity,
            val.address,
            {lat: val.lat, lng: val.lng},
            val.openTime,
            val.closeTime,
            val.rating,
            val.idFeedbacks
          );
          stores.push(store);
        });
      }
      return stores;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async addFavoriteStore(idStore: number): Promise<number> {
    try {
      const response = await this.http.post(`${favoriteStoresUrl}/${idStore}`, idStore, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        throw new Error("server side status error");
      }
      if (data !== null) {
        return data;
      } else return 0;
    } catch (err) {
      await this.handleError(err);
    }
  };

  public async deleteFavoriteStore(idStore: number): Promise<number> {
    try {
      const response = await this.http.delete(`${favoriteStoresUrl}/${idStore}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data !== null) {
        return data;
      } else return 0;
    } catch (err) {
      await this.handleError(err);
    }
  };

  public async getPageContent(id: number): Promise<string> {
    try {
      const response = await this.http
        .get(`${pagesDynamicUrl}/${id}`,RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return data["content"];
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getAction(id: number): Promise<Action> {
    try {
      const response = await this.http
        .get(`${actionDynamicUrl}/${id}`,RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let action: Action = null;
      if (data != null) {
        action = new Action(
          data.id,
          data.name,
          new Date(data.dateStart),
          new Date(data.dateEnd),
          data.img_url,
          data.priority,
          data.sketch_content,
          data.action_content,
          (data.isActive) ? true:false
        );
      }
      return action;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getActions(): Promise<Action[]> {
    try {
      const response = await this.http.get(actionDynamicUrl,RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const actions = new Array<Action>();
      if (data != null) {
        data.forEach(val => {
          const actionItem: Action = new Action(
            val.id,
            val.name,
            new Date(val.dateStart),
            new Date(val.dateEnd),
            val.img_url,
            val.priority,
            val.sketch_content,
            val.action_content,
            (data.isActive) ? true:false
          );

          actions.push(actionItem);
        });
      }
      return actions;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getActionOffersByActionId(idAction: number): Promise<ActionOffer[]> {
    try {
      const response = await this.http
        .get(actionOffersUrl,RequestFactory.makeSearch([
          {key: "idAction", value: idAction.toString()}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const aOffers = new Array<ActionOffer>();
      if (data != null) {
        data.forEach(val =>
          aOffers.push(
            new ActionOffer(val.id, val.idAction, val.idQuotation, val.idCur)
          )
        );
      }
      return aOffers;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationProductsByQuotationId(quotationId: number): Promise<QuotationProduct[]> {
    try {
      const response = await this.http
        .get(quotationProductsUrl,RequestFactory.makeSearch([
          {key: "idQuotation", value: quotationId.toString()}
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        data.forEach(val =>
          qProducts.push(
            new QuotationProduct(
              val.id,
              val.idQuotation,
              val.idProduct,
              val.price,
              val.maxDeliveryDays,
              val.stockQuant,
              val.stockLow,
              val.freeShipping,
              val.actionPrice
            )
          )
        );
      }
      return qProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNovelty(id: number): Promise<Novelty> {
    try {
      const response = await this.http
        .get(`${noveltyByIdDynamicUrl}/${id}`,RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let novelty: Novelty;
      if (data != null) {
        novelty = new Novelty(
          data.id,
          data.idProduct,
          data.name,
          data.img_url,
          data.priority,
          data.sketch_content,
          data.novelty_content
        );
      }
      return novelty;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNovelties(): Promise<Novelty[]> {
    try {
      const response = await this.http.get(noveltiesDynamicUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let novelties: Array<Novelty> = new Array<Novelty>();
      if (data != null) {
        data.forEach(val => {
          const novelty: Novelty = new Novelty(
            val.id,
            val.idProduct,
            val.name,
            val.img_url,
            val.priority,
            val.sketch_content,
            val.novelty_content
          );
          novelties.push(novelty);
        });
      }
      return novelties;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollById(id: number): Promise<Poll> {
    try {
      const response = await this.http
        .get(`${pollsUrl}/${id}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let poll: Poll = null;
      if (data != null) {
        poll = new Poll(
          data.id,
          new Date(data.dateStart),
          new Date(data.dateEnd),
          data.urlBanner,
          data.bannerText
        );
      }
      return poll;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollQuestionsByPollId(pollId: number): Promise<PollQuestion[]> {
    try {
      const response = await this.http
        .get(`${pollQuestionUrl}/${pollId}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const pollQuestions = new Array<PollQuestion>();
      if (data != null) {
        data.forEach(val =>
          pollQuestions.push(
            new PollQuestion(val.id, val.idPoll, val.order, val.question, val.answerType)
          )
        );
      }
      return pollQuestions.sort((a: PollQuestion, b: PollQuestion): number => {
        return b.order - a.order;
      });
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNoveltyDetailsByNoveltyId(id: number): Promise<NoveltyDetails[]> {
    try {
      const response = await this.http.get(`${noveltyDetailsDynamicUrl}/${id}`,RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let noveltyDetails: NoveltyDetails[] = [];
      if (data != null) {
        data.forEach(val => {
          let detail: NoveltyDetails = new NoveltyDetails(
            val.id,
            val.idNovelty,
            val.idProduct
          );
          noveltyDetails.push(detail);
        });
      }
      return noveltyDetails;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollAnswersByQuestionId(idPollQuestion: number): Promise<PollQuestionAnswer[]> {
    try {
      const response = await this.http
        .get(`${pollQuestionAnswerUrl}/${idPollQuestion}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const pollQuestionAnswers: PollQuestionAnswer[] = new Array<PollQuestion>();
      if (data != null) {
        data.forEach(val =>
          pollQuestionAnswers.push(
            new PollQuestionAnswer(val.id, val.idPollQuestions, val.answer)
          )
        );
      }
      return pollQuestionAnswers;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postClientPoolAnswers(pollAnswers: any): Promise<ClientPollAnswer> {
    try {
      const response = await this.http
        .post(pollsUrl/*clientPollAnswersUrl*/, pollAnswers, RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const clientPollLast: ClientPollAnswer = new ClientPollAnswer
      (data.id, data.idClient, data.idPoll, data.idPollQuestions, data.clientAnswer);

      return clientPollLast;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientPoolAnswersForUserByPollId(pollId: number): Promise<ClientPollAnswer[]> {
    try {
      const response = await this.http
      .get(`${clientPollAnswersUrl}/${pollId}`, RequestFactory.makeAuthHeader())
      .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const clientPollAnswer: ClientPollAnswer[] = new Array<ClientPollAnswer>();
      if (data != null) {
        data.forEach(val =>
          clientPollAnswer.push(
            new ClientPollAnswer(val.id, val.idClient, val.idPoll, val.idPollQuestions, val.clientAnswer)
          )
        );
      }
      return clientPollAnswer;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postDeviceData(deviceData: DeviceData) {
    try {
      const response = await this.http.post(deviceDataUrl, deviceData,RequestFactory.makeAuthHeader()).toPromise();

      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCategories(): Promise<Category[]> {
    try {
      const response = await this.http
        .get(categoriesUrl,RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const categories: Category[] = new Array<Category>();
      if (data != null) {
        data.forEach(val =>
          categories.push(
            new Category(val.id,val.name,val.parent_id,val.id_product_cat,val.prefix,
                         val.icon,val.is_show,val.priority_index,val.priority_show)
          )
        );
      }
      return categories;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadMeasureUnitCache() {
    try {
      const response = await this.http
        .get(measureUnitUrl,RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data.forEach(val => {
            let mUnit = new MeasureUnit();
            mUnit.id = val.id;
            mUnit.name = val.name;
            if (this.isEmpty(this.cache.MeasureUnit.Item(val.id.toString()))) {
              this.cache.MeasureUnit.Add(val.id.toString(), mUnit);
            };
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }


  public async getMeasureUnitById(unitId: number): Promise<MeasureUnit> {
    try {
        const munit: MeasureUnit = new MeasureUnit();
        const id: string = unitId.toString();

        // <editor-fold desc = "id in cache is empty"
        if (this.isEmpty(this.cache.MeasureUnit.Item(id))) {
          this.cache.MeasureUnit.Add(id, munit);

          const response = await this.http
            .get(measureUnitUrl + `/${id}`,RequestFactory.makeAuthHeader())
            .toPromise();

          const data = response.json();
          if (response.status !== 200) {
            throw new Error("server side status error");
          }

          if (data != null) {
            munit.id = data.id;
            munit.name = data.name;

            this.cache.MeasureUnit.Add(id, munit);
          }
          return munit;
        } else {
          // </editor-fold>

          return this.cache.MeasureUnit.Item(id);
        }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductDescription(id: number): Promise<string> {
    try {
      const _id = id.toString();
      const response = await this.http.get(productDescriptionsUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        return data.description;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductImages(id: number): Promise<string[]> {
    try {
      let res = [];
      let data: any = null;
      const _id = id.toString();
      const response = await this.http.get(productImagesUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();
      if (response) {
        data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        if (data != null) {
          data.images.forEach(x => {
              res.push(x);
            }
          );
        }
      }
      return res;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getBannerSlides(): Promise<BannerSlide[]> {
    try {
      const response = await this.http.get(bannerSlidesUrl,RequestFactory.makeAuthHeader()).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let banners: BannerSlide[] = [];
      if (data !== null) {
        data.forEach((banner) => {
          banners.push(banner);
        })
      }
      return banners;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postClientMessage(message: ClientMessage): Promise<ClientMessage> {
    try {
      const response = await this.http.post(clientMessageUrl, message, RequestFactory.makeAuthHeader()).toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postProductReview(productReview: ProductReview): Promise<ProductReview> {
    try {
      const response = await this.http.post(postProductReviewUrl, productReview, RequestFactory.makeAuthHeader())
        .toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postStoreReview(storeReview: StoreReview): Promise<StoreReview> {
    try {
      const response = await this.http.post(postStoreReviewUrl, storeReview, RequestFactory.makeAuthHeader())
        .toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async updateProductReview(productReview: ProductReview): Promise<ProductReview> {
    try {
      const response = await this.http.post(updateProductReviewUrl, productReview,RequestFactory.makeAuthHeader()).toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async updateStoreReview(storeReview: StoreReview): Promise<StoreReview> {
    try {
      const response = await this.http.post(updateStoreReviewUrl, storeReview,RequestFactory.makeAuthHeader()).toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getAppParams(): Promise<IKeyedCollection<AppParam>> {
    try {
      if (this.cache.EnumPaymentMethod.Count() === 0) {
        const response = await this.http
          .get(appParamsUrl).toPromise();

        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          data.forEach(val => {
              let param = new AppParam(val.id, val.propName, val.propVal);

              if (this.isEmpty(this.cache.AppParams.Item(val.propName))) {
                this.cache.AppParams.Add(val.propName, param);
              }
              ;
            }
          );
        }
      };
      return this.cache.AppParams;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getAppParam(param: string): Promise<string> {
    return (<IKeyedCollection<AppParam>>(await this.getAppParams())).Item(param).propVal;
  }

  public async getClientOrderDatesRanges(): Promise<OrdersFilter[]> {
    try {
      const response = await this.http
        .get(clientOrderDatesRangeUrl,RequestFactory.makeAuthHeader()).toPromise();

      const data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const res = [];

      if (data != null) {
        data.forEach(val => {
            res.push(new OrdersFilter(val.key, val.displayName, val.isDefault));
          }
        );
      }
      return res;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getDefaultClientOrderDatesRanges(isDefault: boolean): Promise<OrdersFilter> {
    try {
      const response = await this.http
        .get(clientOrderDatesRangeUrl,RequestFactory.makeSearch([
          {key: "isDefault", value: String(isDefault)}
        ])).toPromise();

      const data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        return new OrdersFilter(data.key, data.displayName, data.isDefault);
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }


  public async getClientOrderProductsByDate(datesRange: string):
              Promise<{orderId: string, orderDate: Date, orderSpecId: number, idProduct: number,
                       productName: string, productImageUrl: string, loTrackTicket: string, idQuotation: number}[]> {
    try {
      const response = await this.http.get(clientOrderProductsByDateUrl,RequestFactory.makeSearch([
        {key: "datesRange", value: datesRange}
      ])).toPromise();

      const data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const res = [];

      if (data != null) {
        data.forEach(val => {
            res.push({orderId: val.orderId, orderDate: val.orderDate, orderSpecId: val.orderSpecId,
              idProduct: val.idProduct, productName: val.productName, productImageUrl: val.productImageUrl,
              loTrackTicket: val.loTrackTicket, idQuotation: val.idQuotation});
          }
        );
      }
      return res;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencyRate():Promise<CurrencyRate[]>{
    try {
      const response = await this.http
        .get(getCurrencyRate,RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const currencyRates: CurrencyRate[] = new Array<CurrencyRate>();
      if (data !== null) {
        data.forEach(val =>
          currencyRates.push(
            new CurrencyRate(val.defaultId,val.targetId,val.rate)
          )
        );
      }
      return currencyRates;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getActionsByProduct(idProduct: number): Promise<ActionByProduct[]> {
    try {
      const _id = idProduct.toString();
      const response = await this.http
        .get(getActionsByProductUrl + `/${_id}` ).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr: ActionByProduct[] = new Array<ActionByProduct>();
      if (data !== null) {
        data.forEach(val =>
          arr.push(
            new ActionByProduct(val.actionId,val.actionType,val.idQuotationProduct,val.idProduct,val.idCur,val.actionPrice,
                                val.regularPrice,val.bonusQty,val.productName,val.complect,val.isMain,val.idGroup,
                                val.imgUrl,val.title)
          )
        );
      }
      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

}
