import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChangeDetectorRef, Component, DoCheck, ViewChild} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {SearchService} from '../../app/service/search-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Subscription} from "rxjs/Subscription";

@IonicPage({name: 'CategoryPage', segment: 'category'})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage extends ComponentBase implements DoCheck {

  @ViewChild('cont') cont;
  @ViewChild('header') header;
  scrollHeight: number;
  scrOrientationSub: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private repo: AbstractDataRepository, private srch: SearchService,
              private screenOrientation: ScreenOrientation, private changeDet: ChangeDetectorRef) {
    super();
  }

  public updateScrollHeight() {
    const hdrH = (this.header) ?  this.header.nativeElement.scrollHeight : 0;
    this.scrollHeight = (window.screen.height) - hdrH;
  }

  ngDoCheck() {
    this.updateScrollHeight();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.srch.hostPage = this;
    await this.srch.searchByCategory(this.navParams.data);
    this.scrOrientationSub = this.screenOrientation.onChange().subscribe(() => {
      this.changeDet.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
  }

}
