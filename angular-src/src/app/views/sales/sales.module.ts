// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NewSalesComponent} from "./new-sales/new-sales.component";
import {SalesRoutingModule} from "./sales-routing.module";
import {CustomMatrialModule} from "../../custom-matrial.module";
import {FormsModule} from "@angular/forms";


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    CustomMatrialModule,
    FormsModule
  ],
  declarations: [
    NewSalesComponent
  ]
})
export class SalesModule { }
