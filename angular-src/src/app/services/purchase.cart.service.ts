import {Injectable} from "@angular/core";
import {MedicineModel} from "../models/medicine.model";
import {SalesItemModel} from "../models/SalesItem.model";

@Injectable()
export class PurchaseCartService{

  _id: string = null;
  salesItem: SalesItemModel[] = [];
  total: number = 0;
  totalDiscount: number = 0;
  vat: number = 0;
  paidAmount: number;
  previousInvoiceNo: number;
  status: number;

  emptyCart(){
    this._id = null;
    this.salesItem = [];
    this.total = 0;
    this.totalDiscount = 0;
    this.vat = 0;
    this.paidAmount = 0;
    this.previousInvoiceNo = 0;
    this.status = 0;
  }

}
