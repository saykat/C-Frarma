import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewPurchaseComponent} from "./new-purchase/new-purchase.component";



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'purchase'
    },
    children: [
      {
        path: 'new-purchase',
        component: NewPurchaseComponent,
        data: {
          title: 'New-Purchase'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule {}
