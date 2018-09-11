import {MedicineGroupModel} from "./medicine-group.model";
import {CompanyModel} from "./company.model";

export class MedicineModel {
  _id: string;
  name: string;
  group: MedicineGroupModel;
  company: CompanyModel;
  applicationFor: string;
  applicationTo: string;
  costPrice: number;
  sellingPrice: number;
  status;
}
