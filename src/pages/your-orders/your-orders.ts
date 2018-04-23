import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service';
import {CartService} from '../../app/service/cart-service';

export class OrdersFilter {
  constructor(
    public key: string,
    public displayName: string,
    public isDefault?: boolean
  ){}
}

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  dataLoaded = false;
  orderProducts = [];
  filter: OrdersFilter = null;

  constructor(private navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository,
                private cart: CartService, public toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    super();

    this.initData(this.navParams.data.filter);
  }

  async initData(data: OrdersFilter) {
    if (!data)
      this.filter = await this.repo.getDefaultClientOrderDatesRanges(true)
    else {
      this.filter = data;
    }
    this.orderProducts = await this.repo.getClientOrderProductsByDate(this.filter.key);
    this.dataLoaded = true;
  }

  onShowFilterClick(filter: OrdersFilter) {
    this.navCtrl.push('OrdersFilterPage', {filter});
  }

  async onBuyItAgainClick(idQuotProd: number){
    const qp = await this.repo.getQuotationProductById(idQuotProd);
    const valQ = await this.repo.getByItAgainQP(qp);
    const message = this.locale['AlertMessage'];
    if (valQ) {
      this.cart.addItem(valQ,  1, valQ.price, null, this)
    }
    else {
      let alert = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
  }

  async onViewOrderDetailsClick(orderId: number) {
    //const order = await this.repo.getClientOrderById(orderId);
    const order = await this.repo.getClientHistOrderById(orderId);
    //console.log(order);
    order.orderHistProducts = await this.repo.getClientHistOrderProductsByOrderId(orderId);
    //console.log(order.orderHistProducts);
    //order.orderProducts = await (<any>order).clientorderproducts_p;
    this.navCtrl.push('OrderDetailsPage', {order: order});
  }

  async onWriteReviewClick(idProduct: number) {
    const product = await this.repo.getProductById(idProduct);
    this.navCtrl.push('ItemReviewWritePage', product);
  }

  onTrackItemClick(orderSpec: number) {
    this.navCtrl.push('LoTrackItemPage', orderSpec);
  }

}
