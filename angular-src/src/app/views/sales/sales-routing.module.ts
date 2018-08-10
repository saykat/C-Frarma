import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSalesComponent} from "./new-sales/new-sales.component";



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales'
    },
    children: [
      {
        path: 'new-sales',
        component: NewSalesComponent,
        data: {
          title: 'New-Sales'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
