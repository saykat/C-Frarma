import {PurchaseDetailsModel} from "./purchaseDetailsModel";

export class PurchaseModel{
  _id: string = null;
  amount: number;
  company: any;
  discount: number;
  discountPer: number;
  insertedBy: any;
  insertedTime: Date;
  iupdatedTime: Date;
  invoiceNo: string;
  purchaseDetails: PurchaseDetailsModel[] = [];
  qty: number;
  status: number = 1;
}
