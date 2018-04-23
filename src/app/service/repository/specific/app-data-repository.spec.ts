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

  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          HttpModule,
          InMemoryWebApiModule.forRoot(WebApiService, {delay: 200, passThruUnknownUrl: true,post204: false, put204: false}),
          IonicModule
        ],
        providers: [
          StatusBar,
          SplashScreen,
          InAppBrowser,
          UserService,
          GoogleMaps,
          Geolocation,
          BarcodeScanner,
          ScreenOrientation,
          LaunchNavigator,
          AppAvailability,
          Ionic2Rating,
          Device,
          Network,
          Keyboard,
          {provide: ErrorHandler, useClass: IonicErrorHandler},
          EventService,
          {provide: AbstractAccountRepository, useClass: AccountRepository},
          {provide: AbstractLocalizationRepository, useClass: LocalizationRepository},
          {provide: AbstractNewsSubscribeService, useClass: MockNewsSubscribeService},
          {provide: AbstractDataRepository, useClass: AppDataRepository},
          NewsSubscribeService,
          AppConstants,
          CurrencyStore,
          SearchService,
          CartService,
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
  // Testing getClientBonusesExpireInfo() method
  describe('getClientBonusesExpireInfo(clientId)', () => {
    it('Should return clientBonuses', async () => {
      expect(clientBonus).toBeDefined();
    });
    it('ClientBonuses are not empty', async () => {
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
  // Testing getBonusesInfo() method
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
  // Testing getCreditProducts() method
  describe('getCreditProducts()', () => {
    it('Should return credit products', async () => {
      expect(creditProducts.length).toBeDefined('No length of creditProducts array');
      expect(creditProducts.length).toBeGreaterThanOrEqual(0, 'No length of creditProducts array');
      for (let i = 0; i < creditProducts.length; i++) {
        expect(creditProducts[i]).toBeDefined();
      }
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
  // Testing getPmtMethods() method
  describe('getPmtMethods()', () => {
    it('Should return payment methods', async () => {
      for (let i = 0; i < pmtMethods.length; i++) {
        expect(pmtMethods[i]).toBeDefined();
      }
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
  // Testing getPmtMethodById() method
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
  // Testing getProductCreditSize() method
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
  // Testing getLoEntitiyById() method
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
  // Testing getLoTrackLogByOrderSpecId() method
  describe('getLoTrackLogByOrderSpecId(id)', () => {
    it('Should return specLOTrackingLog', async () => {
      expect(specLOTrackingLog).toBeDefined();
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
  // Testing getLoEntitiesForSupplier() method
  describe('getLoEntitiesForSupplier(supplierId', () => {
    it('Should return loSupplEntities', async () => {
      expect(loSupplEntities).toBeDefined();
      expect(loSupplEntities.length > 0). toBeTruthy();
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
  // Testing getClientDraftOrder() method
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
