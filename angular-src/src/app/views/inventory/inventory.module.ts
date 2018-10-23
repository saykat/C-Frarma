// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {InventoryRoutingModule} from "./inventory-routing.module";
import {InventoryComponent} from "./inventory.component";
import {DataTablesModule} from "angular-datatables";
import {ProductService} from "../../services/product.service";


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    CustomMatrialModule,
    InventoryRoutingModule,
    DataTablesModule

  ],
  declarations: [
    InventoryComponent,
  ],
  providers:[
    ProductService
  ]
})
export class InventoryModule { }
