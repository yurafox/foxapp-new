import {async, fakeAsync, getTestBed, inject, TestBed, tick} from '@angular/core/testing';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { Injectable } from '@angular/core';
import {Http, HttpModule, RequestMethod, Response, ResponseOptions, URLSearchParams} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import 'rxjs/add/operator/toPromise';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule, Injector} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule, AlertController, App, Config, Platform} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {FormsModule} from '@angular/forms';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {Ionic2Rating, Ionic2RatingModule} from 'ionic2-rating';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

import {AppModule} from '../../../app.module';

import {FoxApp} from '../../../app.component';

import {ReactiveFormsModule} from '@angular/forms';

import {HomePage} from '../../../../pages/home/home';

import {
  EventService,
  AbstractAccountRepository,
  AccountRepository,
  AbstractLocalizationRepository,
  LocalizationRepository,
  AbstractNewsSubscribeService,
  MockNewsSubscribeService,
  AbstractDataRepository,
  AppDataRepository,
  NewsSubscribeService,
  UserService,
  CurrencyStore,
  CartService,
  SearchService,
  ConnectivityService
} from '../../../../app/service/index';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {WebApiService} from '../../../service/webapi/web-api-service';
import {RefInjector} from '../../../core/app-core';
import {ComponentsModule} from '../../../../components/components.module';
import {PipesModule} from "../../../pipe/pipes.module";
import {DirectivesModule} from '../../../directive/directives.module';
import {Geolocation} from '@ionic-native/geolocation';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {LaunchNavigator} from '@ionic-native/launch-navigator';

import {
  AboutPageModule,
  AccountPageModule,
  AccountMenuPageModule,
  ActionPageModule,
  BarcodePageModule,
  CartPageModule,
  CategoriesPageModule,
  CategoryPageModule,
  ChangePasswordPageModule,
  CityPopoverPageModule,
  EditShipAddressPageModule,
  FavoriteStoresPageModule,
  FilterPopoverPageModule,
  ForgotPasswordPageModule,
  HomePageModule,
  ItemDescriptionPageModule,
  ItemDetailPageModule,
  ItemPropsPageModule,
  ItemQuotesPageModule,
  ItemReviewPageModule,
  ItemReviewWritePageModule,
  ItemReviewsPageModule,
  LoginPageModule,
  ManagePlacesMenuPageModule,
  MapPageModule,
  NoConnectionPageModule,
  OrdersPageModule,
  RegisterPageModule,
  SearchPageModule,
  SearchResultsPageModule,
  SelectShipAddressPageModule,
  SupportPageModule,
  ActionsPageModule,
  ShippingOptionsPageModule,
  SelectPmtMethodPageModule,
  CheckoutPageModule,
  CreditCalcPageModule,
  BalancePageModule,
  PollPageModule,
  NoveltyPageModule,
  OrderDetailsPageModule,
  PaymentPageModule,
  WarningViewPageModule,
  OrdersFilterPageModule
} from '../../../../pages/index-modules';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {AppAvailability} from '@ionic-native/app-availability';
import {Device} from "@ionic-native/device";
import {Network} from "@ionic-native/network";
import {Keyboard} from "@ionic-native/keyboard";

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

describe('App-Data-Repository', () => {
  let clientBonus: ClientBonus[] = [];
  let bonusesInfo;
  let creditProducts: CreditProduct[] = [];
  let pmtMethods: EnumPaymentMethod[] = [];
  let pmtMethod: EnumPaymentMethod;
  let productSupplCreditGrades;
  let loEntity: LoEntity;
  let specLOTrackingLog: LoTrackLog[];
  let loSupplEntities: LoSupplEntity[];
  let clientDraftOrder: ClientOrder;
  let clientOrders: ClientOrder[];
  let clientOrder: ClientOrder;
  let clientHistOrder: ClientOrder;
  let clientOrderProducts: ClientOrderProducts[];
  let orderProducts: ClientOrderProducts[];
  let histOrderProducts: ClientOrderProducts[];
  let qProductRevs: ProductReview[];
  let qProductsStorePlaces: ProductStorePlace[];
  let cCountries: Country[];
  let country: Country;
  let client: Client;

  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          // BrowserModule,
          HttpModule,
          // InMemoryWebApiModule.forRoot(WebApiService, {delay: 200, passThruUnknownUrl: true,post204: false, put204: false}),
          // IonicModule
        ],
        providers: [
          // StatusBar,
          // SplashScreen,
          // InAppBrowser,
          // UserService,
          // GoogleMaps,
          // Geolocation,
          // BarcodeScanner,
          // ScreenOrientation,
          // LaunchNavigator,
          // AppAvailability,
          // Ionic2Rating,
          Device,
          Network,
          // Keyboard,
          // {provide: ErrorHandler, useClass: IonicErrorHandler},
          // EventService,
          // {provide: AbstractAccountRepository, useClass: AccountRepository},
          // {provide: AbstractLocalizationRepository, useClass: LocalizationRepository},
          // {provide: AbstractNewsSubscribeService, useClass: MockNewsSubscribeService},
          {provide: AbstractDataRepository, useClass: AppDataRepository},
          // NewsSubscribeService,
          // AppConstants,
          // CurrencyStore,
          // SearchService,
          // CartService,
          ConnectivityService,
          AlertController,
          App,
          Config,
          Platform,
          AppModule
        ]
      });
      
      TestBed.compileComponents();
      
      // prevent Angular from resetting testing module
      TestBed.resetTestingModule = () => TestBed;
      
      // Needs for injecting repositories for lazy loading
      RefInjector.push((TestBed.get(AppModule)).injector);
      let _service = TestBed.get(AbstractDataRepository);

      try {
        console.time('Data loading')

        clientBonus = await _service.getClientBonusesExpireInfo(11049778713);
        bonusesInfo = await _service.getBonusesInfo(11049778713);
        creditProducts = await _service.getCreditProducts();
        pmtMethods = await _service.getPmtMethods();
        pmtMethod = await _service.getPmtMethodById(1);
        productSupplCreditGrades = await _service.getProductCreditSize(6277627, 1);
        loEntity = await _service.getLoEntitiyById(100);
        specLOTrackingLog = await _service.getLoTrackLogByOrderSpecId(253);
        loSupplEntities = await _service.getLoEntitiesForSupplier(1);
        clientDraftOrder = await _service.getClientDraftOrder();
        clientOrders = await _service.getClientOrders();
        clientOrder = await _service.getClientOrderById(340);
        clientHistOrder = await _service.getClientHistOrderById(875);
        clientOrderProducts = await _service.getCartProducts();
        orderProducts = await _service.getClientOrderProductsByOrderId(875);
        histOrderProducts = await _service.getClientHistOrderProductsByOrderId(875);
        qProductRevs = await _service.getProductReviewsByProductId(3051648);
        qProductsStorePlaces = await _service.getProductStorePlacesByQuotId(134877);
        cCountries = await _service.getCountries();
        country = await _service.getCountryById(1);
        client = await _service.getClientByPhone('380637652849');

        console.timeEnd('Data loading')
      } catch (err) {
       console.error(err);
      }
  }, 1000000);

  afterAll(() => {
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  /**
   * GET methods
   */
  describe('getClientBonusesExpireInfo(clientId)', () => {
    it('Should return clientBonuses', async () => {
      expect(clientBonus).toBeDefined();
      expect(clientBonus[0]).toBeDefined();
    });
    describe('Each of clientBonuses should have id, clientId, bonus and dueDate', () => {
      xit('Has id', async () => {
        for (let i = 0; i < clientBonus.length; i++) {
          expect(clientBonus[i].id).toBeDefined('No id');
        }
      }, 10000);
      xit('Has clientId', async () => {
        for (let i = 0; i < clientBonus.length; i++) {
          expect(clientBonus[i].clientId).toBeDefined('No clientId');
        }
      }, 10000);
      it('Has bonus', async () => {
        for (let i = 0; i < clientBonus.length; i++) {
          expect(clientBonus[i].bonus).toBeDefined('No bonus');
        }
      }, 10000);
      it('Has dueDate', async () => {
        for (let i = 0; i < clientBonus.length; i++) {
          expect(clientBonus[i].dueDate).toBeDefined('No dueDate');
        }
      }, 10000);
      it('Bonus is greater than or equal to 0', () => {
        for (let i = 0; i < clientBonus.length; i++) {
          expect(clientBonus[i].bonus).toBeGreaterThanOrEqual(0);
        }
      }, 10000);
    });
  });
  describe('getBonusesInfo(clientId)', () => {
    it('Should return bonuses info', async () => {
      expect(bonusesInfo).toBeDefined('No bonuses info');
    }, 10000);
    it('Has bonus limit', async () => {
      expect(bonusesInfo.bonusLimit).toBeDefined('No bonusLimit');
    }, 10000);
    it('Has action bonus limit', async () => {
      expect(bonusesInfo.actionBonusLimit).toBeDefined('No actionBonusLimit');
    }, 10000);
  });
  describe('getCreditProducts()', () => {
    it('Should return credit products', async () => {
      expect(creditProducts).toBeDefined();
      expect(creditProducts[0]).toBeDefined('Credit products array is empty');
    }, 10000);
    describe('Each of credit products should have all fields', () => {
      it('Has sId', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].sId).toBeDefined('sId');
        }
      }, 10000);
      it('Has sName', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].sName).toBeDefined('sName');
          expect(creditProducts[i].sName !== '').toBeTruthy('sName');
        }
      }, 10000);
      it('Has sDefProdId', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].sDefProdId).toBeDefined('sDefProdId');
        }
      }, 10000);
      it('Has sPartPay', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].sPartPay).toBeDefined('sPartPay');
        }
      }, 10000);
      it('Has sGracePeriod', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].sGracePeriod).toBeDefined('sGracePeriod');
        }
      }, 10000);
      it('Has firstPay', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].firstPay).toBeDefined('firstPay');
        }
      }, 10000);
      it('Has monthCommissionPct', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].monthCommissionPct).toBeDefined('monthCommissionPct');
        }
      }, 10000);
      it('Has minAmt', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].minAmt).toBeDefined('minAmt');
        }
      }, 10000);
      it('Has maxAmt', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].maxAmt).toBeDefined('maxAmt');
        }
      }, 10000);
      it('Has yearPct', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].yearPct).toBeDefined('yearPct');
        }
      }, 10000);
      it('Has kpcPct', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].kpcPct).toBeDefined('kpcPct');
        }
      }, 10000);
      it('Has minTerm', async () => {
        for (let i = 0; i < creditProducts.length; i++) {
          expect(creditProducts[i].minTerm).toBeDefined('minTerm');
        }
      }, 10000);
    });
  });
  describe('getPmtMethods()', () => {
    it('Should return payment methods', async () => {
      expect(pmtMethods).toBeDefined();
      expect(pmtMethods[0]).toBeDefined();
    }, 10000);
    describe('Each of payment methods should have id and name', () => {
      it('Has id', async () => {
        for (let i = 0; i < pmtMethods.length; i++) {
          expect(pmtMethods[i].id).toBeDefined();
        }
      }, 10000);
      it('Has name', async () => {
        for (let i = 0; i < pmtMethods.length; i++) {
          expect(pmtMethods[i].name).toBeDefined();
          expect(pmtMethods[i].name !== '').toBeTruthy();
        }
      }, 10000);
    });
  });
  describe('getPmtMethodById(id)', () => {
    it('Should return payment method', async () => {
      expect(pmtMethod).toBeDefined();
    }, 10000);
    it('Has id', async () => {
      expect(pmtMethod.id).toBeDefined();
    }, 10000);
    it('Has name', async () => {
      expect(pmtMethod.name).toBeDefined();
      expect(pmtMethod.name !== '').toBeTruthy();
    }, 10000);
  });
  describe('getProductCreditSize(idProduct, isSupplier)', () => {
    it('Should be credit grades', async () => {
      expect(productSupplCreditGrades).toBeDefined();
    }, 10000);
    it('Has partsPmtCnt', async () => {
      expect(productSupplCreditGrades.partsPmtCnt).toBeDefined();
    }, 10000);
    it('Has creditSize', async () => {
      expect(productSupplCreditGrades.creditSize).toBeDefined();
    }, 10000);
  });
  describe('getLoEntitiyById(entityId)', () => {
    it('Should return loEntity', async () => {
      expect(loEntity).toBeDefined();
    });
    it('Has id', async () => {
      expect(loEntity.id).toBeDefined('No id');
    });
    it('Has name', async () => {
      expect(loEntity.name).toBeDefined('No name');
    });
  });
  describe('getLoTrackLogByOrderSpecId(id)', () => {
    it('Should return specLOTrackingLog', async () => {
      expect(specLOTrackingLog).toBeDefined();
      expect(specLOTrackingLog[0]).toBeDefined();
    });
    describe('Each of logs should have id, idOrderSpecProd, trackDate and trackString', () => {
      it('Has id', async () => {
        for (let i = 0; i < specLOTrackingLog.length; i++) {
          expect(specLOTrackingLog[i].id).toBeDefined('No id');
        }
      });
      it('Has idOrderSpecProd', async () => {
        for (let i = 0; i < specLOTrackingLog.length; i++) {
          expect(specLOTrackingLog[i].idOrderSpecProd).toBeDefined('No idOrderSpecProd');
        }
      });
      it('Has trackDate', async () => {
        for (let i = 0; i < specLOTrackingLog.length; i++) {
          expect(specLOTrackingLog[i].trackDate).toBeDefined('No trackDate');
        }
      });
      it('Has trackString', async () => {
        for (let i = 0; i < specLOTrackingLog.length; i++) {
          expect(specLOTrackingLog[i].trackString).toBeDefined('No trackString');
          expect(specLOTrackingLog[i].trackString !== '').toBeTruthy('No trackString');
        }
      });
    });
  });
  describe('getLoEntitiesForSupplier(supplierId', () => {
    it('Should return loSupplEntities', async () => {
      expect(loSupplEntities).toBeDefined();
      expect(loSupplEntities[0]).toBeDefined();
    });
    describe('Each of loSupplEntities should have id, idSupplier and idLoEntity', () => {
      it('Has id', async () => {
        for (let i = 0; i < loSupplEntities.length; i++) {
          expect(loSupplEntities[i].id).toBeDefined('No id');
        }
      });
      it('Has idSupplier', async () => {
        for (let i = 0; i < loSupplEntities.length; i++) {
          expect(loSupplEntities[i].idSupplier).toBeDefined('No idSupplier');
        }
      });
      it('Has idLoEntity', async () => {
        for (let i = 0; i < loSupplEntities.length; i++) {
          expect(loSupplEntities[i].idLoEntity).toBeDefined('No idLoEntity');
        }
      });
    });
  });
  describe('getClientDraftOrder()', () => {
    it('Should return clientDraftOrder', async () => {
      expect(clientDraftOrder).toBeDefined();
    });
    it('Has id', async () => {
      expect(clientDraftOrder.id).toBeDefined('No id');
    });
    it('Has orderDate', async () => {
      expect(clientDraftOrder.orderDate).toBeDefined('No orderDate');
    });
    it('Has idCur', async () => {
      expect(clientDraftOrder.idCur).toBeDefined('No idCur');
    });
    it('Has idClient', async () => {
      expect(clientDraftOrder.idClient).toBeDefined('No idClient');
    });
    it('Has total', async () => {
      expect(clientDraftOrder.total).toBeDefined('No total');
    });
    it('Has idPaymentMethod', async () => {
      expect(clientDraftOrder.idPaymentMethod).toBeDefined('No idPaymentMethod');
    });
    it('Has idPaymentStatus', async () => {
      expect(clientDraftOrder.idPaymentStatus).toBeDefined('No idPaymentStatus');
    });
    it('Has idPaymentStatus', async () => {
      expect(clientDraftOrder.idStatus).toBeDefined('No idStatus');
    });
    it('Has loIdEntity', async () => {
      expect(clientDraftOrder.loIdEntity).toBeDefined('No loIdEntity');
    });
    it('Has loIdClientAddress', async () => {
      expect(clientDraftOrder.loIdClientAddress).toBeDefined('No loIdClientAddress');
    });
    it('Has itemsTotal', async () => {
      expect(clientDraftOrder.itemsTotal).toBeDefined('No itemsTotal');
    });
    it('Has shippingTotal', async () => {
      expect(clientDraftOrder.shippingTotal).toBeDefined('No shippingTotal');
    });
    it('Has bonusTotal', async () => {
      expect(clientDraftOrder.bonusTotal).toBeDefined('No bonusTotal');
    });
    it('Has promoBonusTotal', async () => {
      expect(clientDraftOrder.promoBonusTotal).toBeDefined('No promoBonusTotal');
    });
    it('Has bonusEarned', async () => {
      expect(clientDraftOrder.bonusEarned).toBeDefined('No bonusEarned');
    });
    it('Has promoCodeDiscTotal', async () => {
      expect(clientDraftOrder.promoCodeDiscTotal).toBeDefined('No promoCodeDiscTotal');
    });
    it('Has idPerson', async () => {
      expect(clientDraftOrder.idPerson).toBeDefined('No idPerson');
    });
  });
  describe('getClientOrders()', () => {
    it('Should return client orders', async () => {
      expect(clientOrders).toBeDefined();
      expect(clientOrders[0]).toBeDefined();
    });
    describe('Each of client orders should have all fields', () => {
      it('Has id', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].id).toBeDefined('No id');
        }
      });
      it('Has orderDate', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].orderDate).toBeDefined('No orderDate');
        }
      });
      it('Has idCur', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].idCur).toBeDefined('No idCur');
        }
      });
      it('Has idClient', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].idClient).toBeDefined('No idClient');
        }
      });
      it('Has total', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].total).toBeDefined('No total');
        }
      });
      it('Has idPaymentMethod', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].idPaymentMethod).toBeDefined('No idPaymentMethod');
        }
      });
      it('Has idPaymentStatus', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].idPaymentStatus).toBeDefined('No idPaymentStatus');
        }
      });
      it('Has idPaymentStatus', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].idStatus).toBeDefined('No idStatus');
        }
      });
      it('Has loIdEntity', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].loIdEntity).toBeDefined('No loIdEntity');
        }
      });
      it('Has loIdClientAddress', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].loIdClientAddress).toBeDefined('No loIdClientAddress');
        }
      });
      it('Has itemsTotal', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].itemsTotal).toBeDefined('No itemsTotal');
        }
      });
      it('Has shippingTotal', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].shippingTotal).toBeDefined('No shippingTotal');
        }
      });
      it('Has bonusTotal', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].bonusTotal).toBeDefined('No bonusTotal');
        }
      });
      it('Has promoBonusTotal', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].promoBonusTotal).toBeDefined('No promoBonusTotal');
        }
      });
      it('Has bonusEarned', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].bonusEarned).toBeDefined('No bonusEarned');
        }
      });
      it('Has promoCodeDiscTotal', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].promoCodeDiscTotal).toBeDefined('No promoCodeDiscTotal');
        }
      });
      it('Has idPerson', async () => {
        for (let i = 0; i < clientOrders.length; i++) {
          expect(clientOrders[i].idPerson).toBeDefined('No idPerson');
        }
      });
    });
  });
  describe('getClientOrderById(orderId)', () => {
    it('Should return client order', () => {
      expect(clientOrder).toBeDefined();
    });
    it('Has id', async () => {
      expect(clientOrder.id).toBeDefined('No id');
    });
    it('Has orderDate', async () => {
      expect(clientOrder.orderDate).toBeDefined('No orderDate');
    });
    it('Has idCur', async () => {
      expect(clientOrder.idCur).toBeDefined('No idCur');
    });
    it('Has idClient', async () => {
      expect(clientOrder.idClient).toBeDefined('No idClient');
    });
    it('Has total', async () => {
      expect(clientOrder.total).toBeDefined('No total');
    });
    it('Has idPaymentMethod', async () => {
      expect(clientOrder.idPaymentMethod).toBeDefined('No idPaymentMethod');
    });
    it('Has idPaymentStatus', async () => {
      expect(clientOrder.idPaymentStatus).toBeDefined('No idPaymentStatus');
    });
    it('Has idPaymentStatus', async () => {
      expect(clientOrder.idStatus).toBeDefined('No idStatus');
    });
    it('Has loIdEntity', async () => {
      expect(clientOrder.loIdEntity).toBeDefined('No loIdEntity');
    });
    it('Has loIdClientAddress', async () => {
      expect(clientOrder.loIdClientAddress).toBeDefined('No loIdClientAddress');
    });
    it('Has itemsTotal', async () => {
      expect(clientOrder.itemsTotal).toBeDefined('No itemsTotal');
    });
    it('Has shippingTotal', async () => {
      expect(clientOrder.shippingTotal).toBeDefined('No shippingTotal');
    });
    it('Has bonusTotal', async () => {
      expect(clientOrder.bonusTotal).toBeDefined('No bonusTotal');
    });
    it('Has promoBonusTotal', async () => {
      expect(clientOrder.promoBonusTotal).toBeDefined('No promoBonusTotal');
    });
    it('Has bonusEarned', async () => {
      expect(clientOrder.bonusEarned).toBeDefined('No bonusEarned');
    });
    it('Has promoCodeDiscTotal', async () => {
      expect(clientOrder.promoCodeDiscTotal).toBeDefined('No promoCodeDiscTotal');
    });
    it('Has idPerson', async () => {
      expect(clientOrder.idPerson).toBeDefined('No idPerson');
    });
  })
  describe('getClientHistOrderById(orderId)', () => {
    it('Should return client order', () => {
      expect(clientHistOrder).toBeDefined();
    });
    it('Has id', async () => {
      expect(clientHistOrder.id).toBeDefined('No id');
    });
    it('Has orderDate', async () => {
      expect(clientHistOrder.orderDate).toBeDefined('No orderDate');
    });
    it('Has idCur', async () => {
      expect(clientHistOrder.idCur).toBeDefined('No idCur');
    });
    it('Has idClient', async () => {
      expect(clientHistOrder.idClient).toBeDefined('No idClient');
    });
    it('Has total', async () => {
      expect(clientHistOrder.total).toBeDefined('No total');
    });
    it('Has idPaymentMethod', async () => {
      expect(clientHistOrder.idPaymentMethod).toBeDefined('No idPaymentMethod');
    });
    it('Has idPaymentStatus', async () => {
      expect(clientHistOrder.idPaymentStatus).toBeDefined('No idPaymentStatus');
    });
    it('Has idPaymentStatus', async () => {
      expect(clientHistOrder.idStatus).toBeDefined('No idStatus');
    });
    it('Has loIdEntity', async () => {
      expect(clientHistOrder.loIdEntity).toBeDefined('No loIdEntity');
    });
    it('Has loIdClientAddress', async () => {
      expect(clientHistOrder.loIdClientAddress).toBeDefined('No loIdClientAddress');
    });
    it('Has itemsTotal', async () => {
      expect(clientHistOrder.itemsTotal).toBeDefined('No itemsTotal');
    });
    it('Has shippingTotal', async () => {
      expect(clientHistOrder.shippingTotal).toBeDefined('No shippingTotal');
    });
    it('Has bonusTotal', async () => {
      expect(clientHistOrder.bonusTotal).toBeDefined('No bonusTotal');
    });
    it('Has promoBonusTotal', async () => {
      expect(clientHistOrder.promoBonusTotal).toBeDefined('No promoBonusTotal');
    });
    it('Has bonusEarned', async () => {
      expect(clientHistOrder.bonusEarned).toBeDefined('No bonusEarned');
    });
    it('Has promoCodeDiscTotal', async () => {
      expect(clientHistOrder.promoCodeDiscTotal).toBeDefined('No promoCodeDiscTotal');
    });
    it('Has idPerson', async () => {
      expect(clientHistOrder.idPerson).toBeDefined('No idPerson');
    });
    it('Has clientHistFIO', async () => {
      expect(clientHistOrder.clientHistFIO).toBeDefined('No clientHistFIO');
    });
    it('Has clientHistAddress', async () => {
      expect(clientHistOrder.clientHistAddress).toBeDefined('No clientHistAddress');
    });
  })
  describe('getCartProducts()', () => {
    it('Should return cart products', async () => {
      expect(clientOrderProducts).toBeDefined();
      expect(clientOrderProducts[0]).toBeDefined('Products array is empty');
    });
    describe('Each of cart products should have all fields', () => {
      it('Has id', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].id).toBeDefined('No id');
        }
      });
      it('Has idOrder', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].idOrder).toBeDefined('No idOrder');
        }
      });
      it('Has idQuotationProduct', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].idQuotationProduct).toBeDefined('No idQuotationProduct');
        }
      });
      it('Has price', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].price).toBeDefined('No price');
        }
      });
      it('Has qty', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].qty).toBeDefined('No qty');
        }
      });
      it('Has idStorePlace', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].idStorePlace).toBeDefined('No idStorePlace');
        }
      });
      it('Has idLoEntity', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].idLoEntity).toBeDefined('No idLoEntity');
        }
      });
      it('Has loTrackTicket', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].loTrackTicket).toBeDefined('No loTrackTicket');
        }
      });
      it('Has loDeliveryCost', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].loDeliveryCost).toBeDefined('No loDeliveryCost');
        }
      });
      it('Has loDeliveryCompleted', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].loDeliveryCompleted).toBeDefined('No loDeliveryCompleted');
        }
      });
      it('Has loEstimatedDeliveryDate', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].loEstimatedDeliveryDate).toBeDefined('No loEstimatedDeliveryDate');
        }
      });
      it('Has loDeliveryCompletedDate', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].loDeliveryCompletedDate).toBeDefined('No loDeliveryCompletedDate');
        }
      });
      it('Has errorMessage', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].errorMessage).toBeDefined('No errorMessage');
        }
      });
      it('Has warningMessage', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].warningMessage).toBeDefined('No warningMessage');
        }
      });
      it('Has payPromoCode', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].payPromoCode).toBeDefined('No payPromoCode');
        }
      });
      it('Has payPromoCodeDiscount', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].payPromoCodeDiscount).toBeDefined('No payPromoCodeDiscount');
        }
      });
      it('Has payBonusCnt', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].payBonusCnt).toBeDefined('No payBonusCnt');
        }
      });
      it('Has payPromoBonusCnt', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].payPromoBonusCnt).toBeDefined('No payPromoBonusCnt');
        }
      });
      it('Has earnedBonusCnt', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].earnedBonusCnt).toBeDefined('No earnedBonusCnt');
        }
      });
      it('Has warningRead', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].warningRead).toBeDefined('No warningRead');
        }
      });
      it('Has complect', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].complect).toBeDefined('No complect');
        }
      });
      it('Has idAction', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].idAction).toBeDefined('No idAction');
        }
      });
      it('Has actionList', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].actionList).toBeDefined('No actionList');
        }
      });
      it('Has actionTitle', async () => {
        for (let i = 0; i < clientOrderProducts.length; i++) {
          expect(clientOrderProducts[i].actionTitle).toBeDefined('No actionTitle');
        }
      });
    });
  });
  describe('getClientOrderProductsByOrderId(orderId)', () => {
    it('Should return orderProducts', async () => {
      expect(orderProducts).toBeDefined();
      expect(orderProducts[0]).toBeDefined();
    });
    describe('Each of orderProducts should have all fields', () => {
      it('Has id', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].id).toBeDefined('No id');
        }
      });
      it('Has idOrder', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].idOrder).toBeDefined('No idOrder');
        }
      });
      it('Has idQuotationProduct', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].idQuotationProduct).toBeDefined('No idQuotationProduct');
        }
      });
      it('Has price', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].price).toBeDefined('No price');
        }
      });
      it('Has qty', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].qty).toBeDefined('No qty');
        }
      });
      it('Has idStorePlace', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].idStorePlace).toBeDefined('No idStorePlace');
        }
      });
      it('Has idLoEntity', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].idLoEntity).toBeDefined('No idLoEntity');
        }
      });
      it('Has loTrackTicket', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].loTrackTicket).toBeDefined('No loTrackTicket');
        }
      });
      it('Has loDeliveryCost', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].loDeliveryCost).toBeDefined('No loDeliveryCost');
        }
      });
      it('Has loDeliveryCompleted', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].loDeliveryCompleted).toBeDefined('No loDeliveryCompleted');
        }
      });
      it('Has loEstimatedDeliveryDate', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].loEstimatedDeliveryDate).toBeDefined('No loEstimatedDeliveryDate');
        }
      });
      it('Has loDeliveryCompletedDate', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].loDeliveryCompletedDate).toBeDefined('No loDeliveryCompletedDate');
        }
      });
      it('Has errorMessage', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].errorMessage).toBeDefined('No errorMessage');
        }
      });
      it('Has payPromoCode', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].payPromoCode).toBeDefined('No payPromoCode');
        }
      });
      it('Has payPromoCodeDiscount', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].payPromoCodeDiscount).toBeDefined('No payPromoCodeDiscount');
        }
      });
      it('Has payBonusCnt', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].payBonusCnt).toBeDefined('No payBonusCnt');
        }
      });
      it('Has payPromoBonusCnt', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].payPromoBonusCnt).toBeDefined('No payPromoBonusCnt');
        }
      });
      it('Has earnedBonusCnt', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].earnedBonusCnt).toBeDefined('No earnedBonusCnt');
        }
      });
      it('Has warningRead', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].warningRead).toBeDefined('No warningRead');
        }
      });
      it('Has complect', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].complect).toBeDefined('No complect');
        }
      });
      it('Has idAction', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].idAction).toBeDefined('No idAction');
        }
      });
      it('Has actionList', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].actionList).toBeDefined('No actionList');
        }
      });
      it('Has actionTitle', async () => {
        for (let i = 0; i < orderProducts.length; i++) {
          expect(orderProducts[i].actionTitle).toBeDefined('No actionTitle');
        }
      });
    });
  });
  describe('getClientHistOrderProductsByOrderId(orderId)', () => {
    it('Should return histOrderProducts', async () => {
      expect(histOrderProducts).toBeDefined();
      expect(histOrderProducts[0]).toBeDefined();
    });
    describe('Each of histOrderProducts should have all fields', () => {
      it('Has id', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].id).toBeDefined('No id');
        }
      });
      it('Has idOrder', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].idOrder).toBeDefined('No idOrder');
        }
      });
      it('Has idQuotationProduct', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].idQuotationProduct).toBeDefined('No idQuotationProduct');
        }
      });
      it('Has price', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].price).toBeDefined('No price');
        }
      });
      it('Has qty', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].qty).toBeDefined('No qty');
        }
      });
      it('Has idStorePlace', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].idStorePlace).toBeDefined('No idStorePlace');
        }
      });
      it('Has idLoEntity', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].idLoEntity).toBeDefined('No idLoEntity');
        }
      });
      it('Has loTrackTicket', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].loTrackTicket).toBeDefined('No loTrackTicket');
        }
      });
      it('Has loDeliveryCost', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].loDeliveryCost).toBeDefined('No loDeliveryCost');
        }
      });
      it('Has loDeliveryCompleted', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].loDeliveryCompleted).toBeDefined('No loDeliveryCompleted');
        }
      });
      it('Has loEstimatedDeliveryDate', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].loEstimatedDeliveryDate).toBeDefined('No loEstimatedDeliveryDate');
        }
      });
      it('Has loDeliveryCompletedDate', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].loDeliveryCompletedDate).toBeDefined('No loDeliveryCompletedDate');
        }
      });
      it('Has errorMessage', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].errorMessage).toBeDefined('No errorMessage');
        }
      });
      it('Has payPromoCode', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].payPromoCode).toBeDefined('No payPromoCode');
        }
      });
      it('Has payPromoCodeDiscount', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].payPromoCodeDiscount).toBeDefined('No payPromoCodeDiscount');
        }
      });
      it('Has payBonusCnt', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].payBonusCnt).toBeDefined('No payBonusCnt');
        }
      });
      it('Has payPromoBonusCnt', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].payPromoBonusCnt).toBeDefined('No payPromoBonusCnt');
        }
      });
      it('Has earnedBonusCnt', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].earnedBonusCnt).toBeDefined('No earnedBonusCnt');
        }
      });
      it('Has warningRead', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].warningRead).toBeDefined('No warningRead');
        }
      });
      it('Has complect', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].complect).toBeDefined('No complect');
        }
      });
      it('Has idAction', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].idAction).toBeDefined('No idAction');
        }
      });
      it('Has actionList', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].actionList).toBeDefined('No actionList');
        }
      });
      it('Has actionTitle', async () => {
        for (let i = 0; i < histOrderProducts.length; i++) {
          expect(histOrderProducts[i].actionTitle).toBeDefined('No actionTitle');
        }
      });
    });
  });
  describe('getProductReviewsByProductId(productId)', () => {
    it('Should return qProductRevs', async () => {
      expect(qProductRevs).toBeDefined();
      expect(qProductRevs[0]).toBeDefined();
    });
    describe('Each of qProductRevs should have id, user, reviewDate and reviewText', () => {
      it('Has id', async () => {
        for (let i = 0; i < qProductRevs.length; i++) {
          expect(qProductRevs[i].id).toBeDefined('No id');
        }
      });
      it('Has user', async () => {
        for (let i = 0; i < qProductRevs.length; i++) {
          expect(qProductRevs[i].user).toBeDefined('No user');
        }
      });
      it('Has reviewDate', async () => {
        for (let i = 0; i < qProductRevs.length; i++) {
          expect(qProductRevs[i].reviewDate).toBeDefined('No reviewDate');
        }
      });
      it('Has reviewText', async () => {
        for (let i = 0; i < qProductRevs.length; i++) {
          expect(qProductRevs[i].reviewText).toBeDefined('No reviewText');
        }
      });
    });
  });
  describe('getProductStorePlacesByQuotId(quotId)', () => {
    it('Should return qProductsStorePlaces', async () => {
      expect(qProductsStorePlaces).toBeDefined();
      expect(qProductsStorePlaces[0]).toBeDefined();
    });
    describe('Each of qProductsStorePlaces should have id, idQuotationProduct, idStorePlace and qty', () => {
      it('Has id', async () => {
        for (let i = 0; i < qProductsStorePlaces.length; i++) {
          expect(qProductsStorePlaces[i].id).toBeDefined('No id');
        }
      });
      it('Has idQuotationProduct', async () => {
        for (let i = 0; i < qProductsStorePlaces.length; i++) {
          expect(qProductsStorePlaces[i].idQuotationProduct).toBeDefined('No idQuotationProduct');
        }
      });
      it('Has idStorePlace', async () => {
        for (let i = 0; i < qProductsStorePlaces.length; i++) {
          expect(qProductsStorePlaces[i].idStorePlace).toBeDefined('No idStorePlace');
        }
      });
      it('Has qty', async () => {
        for (let i = 0; i < qProductsStorePlaces.length; i++) {
          expect(qProductsStorePlaces[i].qty).toBeDefined('No qty');
        }
      });
    });
  });
  describe('getCountries()', () => {
    it('Should return countries', async () => {
      expect(cCountries).toBeDefined();
      expect(cCountries[0]).toBeDefined();
    });
    describe('Each of countries should have id and name', () => {
      it('Has id', async () => {
        for (let i = 0; i < cCountries.length; i++) {
          expect(cCountries[i].id).toBeDefined('No id');
        }
      });
      it('Has name', async () => {
        for (let i = 0; i < cCountries.length; i++) {
          expect(cCountries[i].name).toBeDefined('No name');
        }
      });
    });
  });
  describe('getCountryById(id)', () => {
    it('Should return country', async () => {
      expect(country).toBeDefined();
    });
    describe('Each of countries should have id and name', () => {
      it('Has id', async () => {
        expect(country.id).toBeDefined('No id');
      });
      it('Has name', async () => {
        expect(country.name).toBeDefined('No name');
      });
    });
  });
  describe('getClientByPhone(phonenum)', () => {
    it('Should return client', async () => {
      expect(client).toBeDefined();
    });
    it('Has id', async () => {
      expect(client.id).toBeDefined('No id');
    });
  });

  /**
   * POST methods
   */

  /**
   * PUT methods
   */

  /**
   * DELETE methods
   */

});
