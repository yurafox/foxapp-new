import {ChangeDetectorRef, Component,DoCheck, ElementRef, ViewChild} from '@angular/core';
import {App, NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/index';
import {SearchService} from '../../app/service/search-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Subscription} from "rxjs/Subscription";

export enum PageMode {
  HomeMode = 1,
  SearchMode = 2,
  SearchResultsMode = 3
}

@IonicPage({name: 'HomePage', segment: 'home'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends ComponentBase implements DoCheck {

  private _pageMode: PageMode = PageMode.HomeMode;

  // list slides for slider
  slides = [
    {
      src: 'assets/imgs/actions/action3.jpg'
    },
    {
      src: 'assets/imgs/actions/action2.jpg'
    },
    {
      src: 'assets/imgs/actions/action1.jpg'
    }
  ];

  @ViewChild('srch') searchButtonControl;
  @ViewChild('cont') cont;
  @ViewChild('itemsList') itemsList;
  @ViewChild('header') header;
  private filterRef: ElementRef;

  @ViewChild('filter') set filter(elRef: ElementRef) {
    this.filterRef = elRef;
  };


  productsOfDay = [];
  productsSalesHits = [];
  content: string = '';
  scrollHeight: number;
  scrOrientationSub: Subscription;

  constructor(public app: App, public nav: NavController, private _repo:AbstractDataRepository,
              public srchService: SearchService, private changeDet: ChangeDetectorRef,
              private screenOrientation: ScreenOrientation) {
    super();
    this.srchService.lastSearch = null;
  }

  async initData() {

    let ar = await this._repo.getProductsOfDay();
    this.productsOfDay = [];
    for (let i of ar) {
      let prod = await this._repo.getProductById(i);
      this.productsOfDay.push(prod);
    }

    let shAr = await this._repo.getProductsSalesHits();
    this.productsSalesHits = [];
    for (let i of shAr) {
      let prod = await this._repo.getProductById(i);
      this.productsSalesHits.push(prod);
    }

  }

  ngDoCheck() {
    this.updateScrollHeight();
  }

  public updateScrollHeight() {
    const hdrH = (this.header) ?  this.header.nativeElement.scrollHeight : 0;
    this.scrollHeight = window.screen.height - hdrH;
  }

  public set pageMode(val: PageMode) {
    if (val === this._pageMode)
      return;
    this._pageMode = val;
    this.changeDet.detectChanges();
    if (val === PageMode.SearchMode) {
      this.searchButtonControl.inputMode = true;
      this.searchButtonControl.incSearch();
    }
    if (val === PageMode.SearchResultsMode)
      this.itemsList.srchResDiv.height = 0;
    this.cont.resize();
  }

  public get pageMode(): PageMode {
    return this._pageMode;
  }

  onSearchClick() {
    this.pageMode = PageMode.SearchMode;
  }

  deleteSearchItem(event: any, item: string) {
    event.stopPropagation();
    this.searchButtonControl.removeSearchItem(item);
  }

  search(srchString: string) {
    this.searchButtonControl.searchByText(srchString);
  }

  async ngOnInit() {
    super.ngOnInit();
    await this.doRefresh(0);
    this.scrOrientationSub = this.screenOrientation.onChange().subscribe(() => {
      if (this._pageMode !== 1) this.changeDet.detectChanges();
    });
    await this.initData();
  }

  ngOnDestroy() {
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
  }

  async doRefresh(refresher) {
    this.content = await this._repo.getPageContent(1);
    /*if (refresher !== 0) {
      this.changeDet.detectChanges();
      refresher.complete();
    }*/
  }
}
