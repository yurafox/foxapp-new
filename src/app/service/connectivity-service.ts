import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Network} from "@ionic-native/network";
import {AlertController, NavController} from "ionic-angular";
import {NoConnectionPage} from "../../pages/no-connection/no-connection";
import { Device } from '@ionic-native/device';

@Injectable()
export class ConnectivityService {
  private navCtrl: NavController;
  private count: number;

  public set nav(nav: NavController) {
    this.navCtrl = nav;
  }

  public set counter(count: number) {
    this.count = count;
  }

  public get counter(): number {
    return this.count;
  }

  constructor(private network: Network, private alertCtrl: AlertController, private device: Device) {
    this.count = 0;
  }

  public checkConnection(error?: any) {
    let activePage = this.navCtrl ? this.navCtrl.getActive() : undefined;
    // <editor-fold desc="For browser testing only">
    if (!this.device.cordova) {
      /*if (activePage && activePage.name !== 'NoConnectionPage') {
        this.showNoConnectionPage(error);
      }*/
      console.error(error.message ? error.message : error);
    }
    // </editor-fold>

    if (this.device.cordova) {
      if (this.network.type !== 'none') {
        console.error(error.message ? error.message : error);
        let alert = this.alertCtrl.create({
          title: 'Ooops',
          message: error.message ? error.message : error,
          buttons: [
            {
              text: 'OK'
            }
          ]
        });
        alert.present().catch((err) => console.log(`Alert error: ${err}`));
        return;
      } else if (this.network.type === 'none') {
        if (activePage && activePage.name !== 'NoConnectionPage') {
          this.showNoConnectionPage(error);
        }
      } else {
        if (activePage && activePage.name !== 'NoConnectionPage') {
          this.showNoConnectionPage(error);
        }
      }
    }
  }

  private showNoConnectionPage(error: any) {
    if (1 > this.count) {
      this.navCtrl.push('NoConnectionPage', {error: error});
      this.count++;
    }
  }
}
