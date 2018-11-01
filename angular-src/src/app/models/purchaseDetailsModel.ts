import {ProductModel} from "./add-products.model";

export class PurchaseDetailsModel{
  _id: string;
  amount: number;
  company: any;
  discount: number;
  discountPer: number;
  insertedBy: any;
  insertedTime: Date;
  updatedTime: Date;
  purchaseId: string;
  status: number;
  qty: number;
  product: ProductModel
}
