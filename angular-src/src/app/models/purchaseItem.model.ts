import {MedicineModel} from "./medicine.model";

export class PurchaseItemModel extends MedicineModel{
  qty: number ;
  discount: number;
  discountPer: number;
  subtotal: number ;
}
