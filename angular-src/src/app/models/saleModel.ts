import {SaleDetailsModel} from "./saleDetailsModel";

export class SaleModel{
  _id: string = null;
  amount: number;
  company: any;
  discount: number;
  discountPer: number;
  insertedBy: any;
  insertedTime: Date;
  iupdatedTime: Date;
  invoiceNo: string;
  saleDetails: SaleDetailsModel[] = [];
  qty: number;
  status: number = 1;

}
