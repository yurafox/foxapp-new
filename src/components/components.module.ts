import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import {SearchBtnComponent} from './search-btn/search-btn';
import {IonicModule} from 'ionic-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MainToolbarComponent} from './main-toolbar/main-toolbar';
import {ItemComponent} from './item/item';
import {PipesModule} from '../app/pipe/pipes.module';
import {Ionic2RatingModule} from 'ionic2-rating';
import {ProductRatingComponent} from './product-rating/product-rating';
import {ItemPropsComponent} from './item-props/item-props';
import {ItemDescriptionComponent} from './item-description/item-description';
import {ItemReviewComponent} from './item-review/item-review';
import {ReadMoreComponent} from './read-more/read-more';
import {ItemsListComponent} from './items-list/items-list';
import {FilterComponent} from './filter/filter';
import {CustomPopupComponent} from './custom-popup/custom-popup';
import {DropdownViewComponent} from './dropdown-view/dropdown-view';
import {DropdownListComponent} from './dropdown-list/dropdown-list';
import {ActionSketchComponent} from './action-sketch/action-sketch';
import {HtmlOutlet} from './html-outlet/html-outlet';
import {ShippingAddressComponent} from './shipping-address/shipping-address';
import { PromoCodeComponent } from './promo-code/promo-code';
import { NoveltySketchComponent } from './novelty-sketch/novelty-sketch';
import { CreditComponent } from './credit/credit';
import { CreditBriefComponent } from './credit-brief/credit-brief';
import { BonusComponent } from './bonus/bonus';
import { BonusPayComponent } from './bonus-pay/bonus-pay';
import { ErrorComponent } from './error/error';
import { PollBannerComponent } from './poll-banner/poll-banner';
import { GridHrComponent } from './grid-hr/grid-hr';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ItemSimpleComponent } from './item-simple/item-simple';
import { SlidingBannerComponent } from './sliding-banner/sliding-banner';
import { ComplectComponent } from './complect/complect';

@NgModule({
  declarations: [
    SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent,
    ProductRatingComponent,
    ItemPropsComponent,
    ItemDescriptionComponent,
    ItemReviewComponent,
    ReadMoreComponent,
    ItemsListComponent,
    FilterComponent,
    CustomPopupComponent,
    DropdownListComponent,
    DropdownViewComponent,
    ActionSketchComponent,
    HtmlOutlet,
    ShippingAddressComponent,
    PromoCodeComponent,
    NoveltySketchComponent,
    CreditComponent,
    CreditBriefComponent,
    BonusComponent,
    BonusPayComponent,
    ErrorComponent,
    PollBannerComponent,
    GridHrComponent,
    ProgressBarComponent,
    ItemSimpleComponent,
    SlidingBannerComponent,
    ComplectComponent
  ],
  entryComponents: [
    CustomPopupComponent,
    DropdownViewComponent,
    DropdownListComponent,
  ],

  imports: [
    IonicModule,
    PipesModule,
    Ionic2RatingModule,
    LazyLoadImagesModule,
    InfiniteScrollModule
  ],
  exports: [
    SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent,
    ProductRatingComponent,
    ItemPropsComponent,
    ItemDescriptionComponent,
    ItemReviewComponent,
    ReadMoreComponent,
    ItemsListComponent,
    FilterComponent,
    CustomPopupComponent,
    DropdownListComponent,
    DropdownViewComponent,
    ActionSketchComponent,
    HtmlOutlet,
    ShippingAddressComponent,
    PromoCodeComponent,
    NoveltySketchComponent,
    CreditComponent,
    CreditBriefComponent,
    BonusComponent,
    BonusPayComponent,
    ErrorComponent,
    PollBannerComponent,
    GridHrComponent,
    ProgressBarComponent,
    ItemSimpleComponent,
    SlidingBannerComponent,
    ComplectComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule {
}
