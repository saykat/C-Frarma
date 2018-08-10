// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {InventoryRoutingModule} from "./inventory-routing.module";
import {InventoryComponent} from "./inventory.component";


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    CustomMatrialModule,
    InventoryRoutingModule

  ],
  declarations: [
    InventoryComponent
  ]
})
export class InventoryModule { }
