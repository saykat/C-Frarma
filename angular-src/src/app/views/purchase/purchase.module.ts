// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {NewPurchaseComponent} from "./new-purchase/new-purchase.component";
import {PurchaseRoutingModule} from "./purchase-routing.module";


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    CustomMatrialModule

  ],
  declarations: [
    NewPurchaseComponent
  ]
})
export class PurchaseModule { }
