// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {NewPurchaseComponent} from "./new-purchase/new-purchase.component";
import {PurchaseRoutingModule} from "./purchase-routing.module";
import {FormsModule} from "@angular/forms";
import {MedicineService} from "../../services/medicine.service";
import {CompanyService} from "../../services/company.service";
import {SalesService} from "../../services/sales.service";
import {MedicineGroupService} from "../../services/medicine-group.service";


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    CustomMatrialModule,
    FormsModule

  ],
  declarations: [
    NewPurchaseComponent
  ],
  providers: [
    MedicineService,
    CompanyService,
    MedicineGroupService,
    SalesService
  ]
})
export class PurchaseModule { }
