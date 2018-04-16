export class ActionByProduct {
  constructor(
    public actionId: number,
    public actionType: number,
    public idQuotationProduct: number,
    public idProduct: number,
    public idCur: number,
    public actionPrice?: number,
    public regularPrice?: number,
    public bonusQty?: number,
    public productName?: string,
    public complect?: string,
    public isMain?: number,
    public idGroup?: number,
    public imgUrl?: string,
    public title?: string
  ){}
}
