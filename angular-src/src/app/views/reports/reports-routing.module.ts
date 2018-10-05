


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SalesReportComponent} from "./sales-report/sales-report.component";
import {PurchaseReportComponent} from "./purchase-report/purchase-report.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'sales-report',
        component: SalesReportComponent,
        data: {
          title: 'Sales Report'
        }
      },
      {
        path: 'purchase-report',
        component: PurchaseReportComponent,
        data: {
          title: 'Purchase Report'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
