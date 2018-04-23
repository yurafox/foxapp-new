import { QuotationProduct,
          Product,
          Quotation,
          Supplier,
          Currency,
          Manufacturer,
          City,
          Store,
          StorePlace,
          ProductReview,
          ProductStorePlace,
          Lang,
          Client,
          Action,
          ActionOffer,
          ClientAddress,
          Country,
          ClientOrder,
          ClientOrderProducts,
          StoreReview,
          LoEntity,
          Novelty,
          NoveltyDetails,
          DeviceData,
          LoSupplEntity,
          EnumPaymentMethod,
          Poll,PollQuestion,PollQuestionAnswer,
          ClientPollAnswer, PersonInfo, CreditProduct, ClientBonus,
          LoTrackLog,
          Category,
          MeasureUnit,
          Region,
          BannerSlide,
          ClientMessage,
          CurrencyRate,
          ActionByProduct
       } from '../../../model/index';
import {IDictionary, Providers} from "../../../core/app-core";
import {AppParam} from '../../../model/app-param';
import IKeyedCollection = Providers.IKeyedCollection;
import {OrdersFilter} from '../../../../pages/your-orders/your-orders';

export abstract class AbstractDataRepository {
  public async abstract getProductReviewsByProductId(productId: number): Promise<ProductReview[]>;
  public async abstract getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]>;
  public async abstract getProductsOfDay(): Promise<number[]>;
  public async abstract getProductsSalesHits(): Promise<number[]>;

  public async abstract searchProducts(srchString: string): Promise<Product[]>;

  public async abstract getSuppliers(cacheForce: boolean): Promise<Supplier[]>;
  public async abstract getCurrencies(cacheForce: boolean): Promise<Currency[]>;
  public async abstract getLocale(cacheForce: boolean): Promise<Lang[]>;

  public async abstract getQuotationProductById(qpId: number): Promise<QuotationProduct>;
  public async abstract getByItAgainQP(originalQP: QuotationProduct): Promise<QuotationProduct>;
  public async abstract getValueQuotByProduct(id: number): Promise<QuotationProduct>;

  public async abstract getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]>;
  public async abstract getQuotationProductsByQuotationId(quotationId:number) : Promise<QuotationProduct[]>;
  public async abstract getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]>;
  public async abstract loadStorePlaceCache();
  public async abstract getStorePlaceById(id: number): Promise<StorePlace>;
  public abstract getProductFromResponse(data: any): Product;
  public async abstract getProductById(productId: number): Promise<Product>;
  public async abstract getQuotationById(quotationId: number): Promise<Quotation>;
  public async abstract loadSuppliersCache();
  public async abstract getSupplierById(supplierId: number): Promise<Supplier>;
  public async abstract getPersonById(personId: number): Promise<PersonInfo>;
  public async abstract insertPerson(person: PersonInfo): Promise<PersonInfo>;
  public async abstract updatePerson(person: PersonInfo): Promise<PersonInfo>;



  public async abstract getCurrencyById(currencyId: number): Promise<Currency>;
  public async abstract getManufacturerById(manufacturerId: number): Promise<Manufacturer>;
  public async abstract getManufacturers(cacheForce: boolean): Promise<Manufacturer[]>;

  public async abstract getLoEntitiesForSupplier(supplierId: number):Promise<LoSupplEntity[]>;
  public async abstract getLoEntitiyById(entityId: number):Promise<LoEntity>;
  public async abstract getLoTrackLogByOrderSpecId(id: number): Promise<LoTrackLog[]>;
  public async abstract getDeliveryDate(order: ClientOrderProducts, loEntityId: number, loIdClientAddress: number): Promise<Date>;
  public async abstract getDeliveryCost(order: ClientOrderProducts, loEntityId: number, loIdClientAddress: number): Promise<number>;
  public async abstract getProductCreditSize(idProduct: number, isSupplier: number): Promise<any>;

  public async abstract postOrder(order: ClientOrder): Promise<{isSuccess: boolean, errorMessage: string}>;
  public async abstract getClientDraftOrder(): Promise<ClientOrder>;
  public async abstract saveClientDraftOrder(order: ClientOrder): Promise<ClientOrder>;
  public async abstract getClientOrders(): Promise<ClientOrder[]>;
  public async abstract getClientOrderById(orderId: number): Promise<ClientOrder>;
  public async abstract getClientHistOrderById(orderId: number): Promise<ClientOrder>;
  public async abstract getClientOrderProductsByOrderId(orderId: number): Promise<ClientOrderProducts[]>;
  public async abstract getClientHistOrderProductsByOrderId(orderId: number): Promise<ClientOrderProducts[]>;

  public async abstract getCartProducts(): Promise<ClientOrderProducts[]>;
  public async abstract saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract insertCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract deleteCartProduct(prod: ClientOrderProducts);
  public async abstract getBonusesInfo(clientId: number): Promise<{bonusLimit: number, actionBonusLimit: number}>;
  public async abstract calculateCart(promoCode: string,
                                      maxBonusCnt: number,
                                      usePromoBonus: boolean,
                                      creditProductId: number /*,
                                      cartContent: ClientOrderProducts[]*/)
                                                              : Promise<{clOrderSpecProdId: number,
                                                                          promoCodeDisc: number, bonusDisc: number,
                                                                          promoBonusDisc: number, earnedBonus: number,
                                                                          qty: number}[]>;

  public async abstract getClientBonusesExpireInfo(clientId: number): Promise <ClientBonus[]>;

  public async abstract getCountryById(id: number): Promise<Country>;
  public async abstract getCountries(): Promise<Country[]>;
  public async abstract getClientByUserId (id: number): Promise<Client>;
  public async abstract getClientByPhone (phonenum: string ): Promise<Client>;
  public async abstract getClientAddressesByClientId(id: number): Promise<ClientAddress[]>;
  public async abstract getClientAddressById(id: number): Promise<ClientAddress>;
  public async abstract saveClientAddress(address: ClientAddress): Promise<ClientAddress>;
  public async abstract createClientAddress(address: ClientAddress): Promise<ClientAddress>;
  public async abstract deleteClientAddress(address: ClientAddress);

  public async abstract loadCityCache();
  public async abstract getCityById(id: number): Promise<City>;
  public async abstract getCities(): Promise<City[]>;
  public async abstract searchCities(srchString: string): Promise<City[]>;

  public async abstract loadRegionsCache();
  public async abstract getRegionById(id: number): Promise<Region>;
  public async abstract getRegions(): Promise<Region[]>;


  public async abstract getCitiesWithStores(): Promise<City[]>;
  public async abstract getStores(): Promise<IDictionary<Store[]>>;
  public async abstract getStoreById(id: number): Promise<Store>;
  public async abstract getStoreReviews(): Promise<IDictionary<StoreReview[]>>;
  public async abstract getStoreReviewsByStoreId(storeId: number): Promise<StoreReview[]>;
  public async abstract getFavoriteStores(): Promise<Store[]>;
  public async abstract addFavoriteStore(idStore: number): Promise<number>;
  public async abstract deleteFavoriteStore(idStore: number): Promise<number>;
  public async abstract getPageContent(id:number):Promise<string>;
  public async abstract getAction(id:number):Promise<Action>;
  public async abstract getActions():Promise<Action[]>;
  public async abstract loadPmtMethodsCache();
  public async abstract getPmtMethods(): Promise<EnumPaymentMethod[]>;
  public async abstract getPmtMethodById(id: number): Promise<EnumPaymentMethod>;
  public async abstract getCreditProducts(): Promise<CreditProduct[]>;

  public async abstract getNovelty(id: number): Promise<Novelty>;
  public async abstract getNovelties(): Promise<Novelty[]>;
  public async abstract getPollById(id:number): Promise<Poll>;
  public async abstract getPollQuestionsByPollId(pollId:number):Promise<PollQuestion[]>;
  public async abstract getPollAnswersByQuestionId(idPollQuestion:number):Promise<PollQuestionAnswer[]>;
  public async abstract postClientPoolAnswers(pollAnswers:any):Promise<ClientPollAnswer>;
  public async abstract getClientPoolAnswersForUserByPollId(pollId:number):Promise<ClientPollAnswer[]>;
  public async abstract getNoveltyDetailsByNoveltyId(id: number): Promise<NoveltyDetails[]>;
  public async abstract postProductView(idProduct: number, params: string);
  public async abstract postDeviceData(deviceData: DeviceData);
  public async abstract getCategories(): Promise<Category[]>;
  public async abstract loadMeasureUnitCache();
  public async abstract getMeasureUnitById(unitId: number): Promise<MeasureUnit>;
  public async abstract getProductDescription(id: number): Promise<string>;
  public async abstract getProductImages(id: number): Promise<string[]>;

  public async abstract getBannerSlides(): Promise<BannerSlide[]>;
  public async abstract postClientMessage(message: ClientMessage): Promise<ClientMessage>;
  public async abstract postProductReview(review: ProductReview): Promise<ProductReview>;
  public async abstract postStoreReview(review: StoreReview): Promise<StoreReview>;
  public async abstract updateProductReview(review: ProductReview): Promise<ProductReview>;
  public async abstract updateStoreReview(review: StoreReview): Promise<StoreReview>;
  public async abstract getAppParams(): Promise<IKeyedCollection<AppParam>>;
  public async abstract getAppParam(param: string): Promise<string>;
  public async abstract getClientOrderDatesRanges(): Promise<OrdersFilter[]>;
  public async abstract getDefaultClientOrderDatesRanges(isDefault: boolean): Promise<OrdersFilter>;

  public async abstract getClientOrderProductsByDate(datesRange: string):
                        Promise<{orderId: string, orderDate: Date, orderSpecId: number, idProduct: number,
                          productName: string, productImageUrl: string, loTrackTicket: string,
                          idQuotation: number}[]>;

  public async abstract getCurrencyRate():Promise<CurrencyRate[]>;
  public async abstract getActionsByProduct(idProduct: number): Promise<ActionByProduct[]>;
  public async abstract getProductsByActionId(actionId: number):  Promise<Product[]>;
}
