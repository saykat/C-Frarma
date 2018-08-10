// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NewSalesComponent} from "./new-sales/new-sales.component";
import {SalesRoutingModule} from "./sales-routing.module";
import {CustomMatrialModule} from "../../custom-matrial.module";


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    CustomMatrialModule,

  ],
  declarations: [
    NewSalesComponent
  ]
})
export class SalesModule { }
