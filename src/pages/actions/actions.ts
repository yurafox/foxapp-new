import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import { Action } from '../../app/model/index';
import { AbstractDataRepository } from '../../app/service/index';

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage extends ComponentBase {
  public actions:Action[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _repo: AbstractDataRepository ) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.actions = [];
    let actions = await this._repo.getActions();
    for (let i = 0; i < actions.length; i++) {
      if (actions[i].sketch_content && actions[i].sketch_content !== '') {
        this.actions.push(actions[i]);
      }
    }
  }

}
