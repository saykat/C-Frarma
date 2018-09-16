import {CompanyModel} from "./company.model";
import {MedicineGroupModel} from "./medicine-group.model";

export class AddProductsModel{
  name: string;
  medicineName:string;
  groupName:string;
  groupId:string;
  companyName: string;
  companyId: string;
  states: string;
  power:string;
  price:string;
  sellingPrice:string;
  costPrice:string;
  company: CompanyModel;
  group: MedicineGroupModel;
}
