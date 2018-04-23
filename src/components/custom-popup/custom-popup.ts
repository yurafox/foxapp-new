import {Component, Renderer, Renderer2} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {AlertController, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {ProductStorePlace} from '../../app/model/product-store-place';
import {ItemBase} from '../component-extension/item-base';
import {CityPopoverPage} from '../../pages/city-popover/city-popover';

@Component({
  selector: 'custom-popup',
  templateUrl: 'custom-popup.html'
})
export class CustomPopupComponent extends ComponentBase {
  public itemPage: ItemBase;
  public displayLocations: ProductStorePlace[] = new Array<ProductStorePlace>();
  public originalLocations: ProductStorePlace[] = new Array<ProductStorePlace>();

  constructor(public renderer: Renderer, public viewCtrl: ViewController, public navCtrl: NavController,
              public navParams: NavParams, public popoverCtrl: PopoverController,
              private alertCtrl: AlertController) {
    super();
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
    this.itemPage = navParams.get('itemPage');

    this.itemPage.productStorePlaces.forEach(i => {
        this.originalLocations.push(i);
        this.displayLocations.push(i);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  showCitySelector(event) {
    let popover = this.popoverCtrl.create(CityPopoverPage, {caller: this});
    popover.present({
      ev: event
    });
  }

  async selectPickupStorePlace(sPlace: ProductStorePlace) {
    let sp = await (<any>sPlace).storeplace;
    let title = this.locale['AlertTitle'];
    const param1 = sp.name;
    let message = eval('`'+ this.locale['AlertMessage'] +'`');
    let cancel = this.locale['Cancel'];
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            (<any>this.itemPage).selectedStorePlace = sp;
            this.viewCtrl.dismiss();
          }
        },
        {
          text: cancel,
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    alert.present();



  }

}
