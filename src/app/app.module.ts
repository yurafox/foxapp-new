import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule, Injector} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {Ionic2Rating, Ionic2RatingModule} from 'ionic2-rating';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

import {FoxApp} from './app.component';

import {ReactiveFormsModule} from '@angular/forms';

import {HomePage} from '../pages/home/home';

import {AppConstants} from './app-constants';
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
} from '../app/service/index';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {WebApiService} from './service/webapi/web-api-service';
import {RefInjector} from './core/app-core';
import {ComponentsModule} from '../components/components.module';
import {PipesModule} from "./pipe/pipes.module";
import {DirectivesModule} from './directive/directives.module';
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
} from '../pages/index-modules';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {AppAvailability} from '@ionic-native/app-availability';
import {Device} from "@ionic-native/device";
import {Network} from "@ionic-native/network";
import {Keyboard} from "@ionic-native/keyboard";

@NgModule({
  declarations: [
    FoxApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WebApiService, {delay: 200, passThruUnknownUrl: true,post204: false, put204: false}),
    IonicModule.forRoot(FoxApp),
    IonicPageModule.forChild(HomePage),
    InfiniteScrollModule,
    LazyLoadImagesModule,
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgxQRCodeModule,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FoxApp,
    HomePage
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
    ConnectivityService
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    RefInjector.push(this.injector);
  }
}
