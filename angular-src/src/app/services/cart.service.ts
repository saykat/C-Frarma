import {Injectable} from "@angular/core";
import {MedicineModel} from "../models/medicine.model";
import {SalesItemModel} from "../models/SalesItem.model";

@Injectable()
export class CartService{
  salesItem: SalesItemModel[] = [];
  total: number = 0;
  totalDiscount: number = 0;
  vat: number = 0;
  paidAmount: number;

}
