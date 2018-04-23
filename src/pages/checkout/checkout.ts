import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage extends ComponentBase {

  dataLoaded = true;
  pmtMethodName = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public repo: AbstractDataRepository, public alertCtrl: AlertController) {
    super();
    this.repo.getPmtMethodById(cart.order.idPaymentMethod).then(x => {this.pmtMethodName = x.name});
  }

  validatePage(): {isValid: boolean, errors: string[]} {
    let err = [];
    if (this.cart.order) {
      if (this.cart.order.idPaymentMethod === 3)
        this.cart.validateLoan(this.cart.cartGrandTotal).validationErrors.forEach(i => {err.push(i)});
      this.cart.orderProducts.forEach(i => {
        if(i.errorMessage)
          err.push(i.errorMessage);
      });
    };
    return {isValid: !(err.length>0), errors: err};
  }

  async onPlaceOrderClick() {
    //Save cart items
    for (let i of this.cart.orderProducts) {
      await this.repo.saveCartProduct(i);
    }

    if (this.cart.order.idPaymentMethod === 2) {
      this.navCtrl.push('PaymentPage').catch(err => console.error(err));
    }
    else
    // TODO show messagebox
    {
      let res = await this.repo.postOrder(this.cart.order);

      if (res.isSuccess)
      {
        //console.log('Success!!!!');

        let title = this.locale['AlertTitle'];
        let message = this.locale['AlertMessage'];
        let btnText = this.locale['BtnText'];
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: btnText,
              handler: () => {
                this.navCtrl.setRoot('HomePage');
                this.cart.emptyCart();
                this.cart.initCart();
              }
            }
          ]
        });
        alert.present();
      }
      else
      {
        //console.log(res.errorMessage);
        let title = this.locale['AlertErrorTitle'];
        let message = this.locale['AlertErrorMessage'] + ' ' + res.errorMessage;
        let btnText = this.locale['BtnErrorText'];
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: btnText,
              handler: () => {
                this.cart.emptyCart();
                this.cart.initCart().then(() => {
                    this.navCtrl.setRoot('CartPage');
                  }
                );
              }
            }
          ]
        });
        alert.present();
      };
    };
  }

  async onAfterQtyUpdate(item: any, objRef:any) {
    let j = 0;
    for (let i of this.cart.loResultDeliveryOptions) {
      if (i.idClientOrderProduct === objRef.id)  {
        break;
      }
      j++;
    }


    //TODO пересчитать стоимость логистики для всех товаров комплекта!!
    this.repo.getDeliveryCost(objRef, this.cart.loResultDeliveryOptions[j].loEntityId, this.cart.order.loIdClientAddress).then(r => {
        this.cart.loResultDeliveryOptions[j].deliveryCost = r;
      }
    );
    await this.cart.updateItem(objRef);
    this.evServ.events['cartUpdateEvent'].emit();
  }

}
