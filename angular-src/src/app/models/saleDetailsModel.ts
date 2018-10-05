import {ProductModel} from "./add-products.model";

export class SaleDetailsModel{
  _id: string;
  amount: number;
  company: any;
  discount: number;
  discountPer: number;
  insertedBy: any;
  insertedTime: Date;
  updatedTime: Date;
  salesID: string;
  status: number;
  qty: number;
  product: ProductModel
}
