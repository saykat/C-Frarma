import {MedicineModel} from "./medicine.model";

export class SalesItemModel extends MedicineModel{
  qty: number ;
  discount: number;
  discountPer: number;
  subtotal: number ;
}
