import {CompanyModel} from "./company.model";
import {MedicineGroupModel} from "./medicine-group.model";

export class ProductModel{
  _id: string = null;
  name: string;
  medicineName:string;
  groupName:string;
  groupId:string;
  companyName: string;
  companyId: string;
  states: string;
  power:string;
  sellingPrice:string;
  costPrice:string;
  company: CompanyModel;
  group: MedicineGroupModel;
  status: number;
}
