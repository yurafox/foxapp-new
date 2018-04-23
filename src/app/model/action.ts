export class Action {
  constructor(public id?: number,
              public name?: string,
              public dateStart?:Date,
              public dateEnd?:Date,
              public img_url?:string,
              public priority?:number,
              public sketch_content?:string,
              public action_content?:string,
              public isActive:boolean=false,
              public id_type?:number,
              public badge_url?:string,
              public id_supplier?:number,
              public title?:string,
              public is_landing:boolean=false
              ) {}
}
