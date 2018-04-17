import { Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {AbstractDataRepository} from '../../app/service/index';
import {fadeInAnimation} from '../../app/core/animation-core';
import {Novelty, Product} from "../../app/model/index";
import {ComponentBase} from "../component-extension/component-base";

@Component({
  selector: 'novelty-sketch',
  templateUrl: 'novelty-sketch.html',
  animations: [fadeInAnimation]
})
export class NoveltySketchComponent extends ComponentBase{
  @Input() public innerId:number;
  @Input() public content:string='';
  @Input() public novelty: Novelty;
  @Input() public product: Product;
  private productId: number;

  constructor(public navCtrl: NavController, private _repo:AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    if (!this.novelty || !this.novelty.id) {
      this.novelty = await this._repo.getNovelty(this.innerId);
      if (this.novelty) {
        this.productId = this.novelty.idProduct;
        this.product = await this._repo.getProductById(this.novelty.idProduct);
      }
    } else {
      if(this.novelty.idProduct) {
        this.productId = this.novelty.idProduct;
        this.product = await this._repo.getProductById(this.novelty.idProduct);
      }
    }
    if (this.novelty && this.novelty.sketch_content) this.content=this.novelty.sketch_content;
    this.evServ.events['noveltyPushEvent'].emit(this);
  }

  public openNovelty() {
    if (this.product && this.novelty) {
      this.navCtrl.push('NoveltyPage', {
        id: this.innerId || this.novelty.id,
        novelty: this.novelty,
        product: this.product,
        productId: this.productId
      }).catch(
        err => {
          console.log(`Error navigating to NoveltyPage: ${err}`);
        }
      );
    }
  }

  public get id ():number {
    return this.novelty.id;
  }

  public get name ():string {
    return this.novelty.name;
  }

  public get img_url ():string {
    return this.novelty.img_url;
  }

  public get priority ():number {
    return this.novelty.priority;
  }

  public get sketch_content ():string {
    return this.novelty.sketch_content;
  }

  public get novelty_content ():string {
    return this.novelty.novelty_content;
  }
}
