import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProductComponent} from "./add-product/add-product.component";
import {AddMedicineGroup} from "./add-medicine-group/add-medicine-group";
import {AddCompanyComponent} from "./add-company/add-company.component";



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products'
    },
    children: [
      {
        path: 'add-product',
        component: AddProductComponent,
        data: {
          title: 'Add-Product'
        }
      },
      {
        path: 'add-medicine-group',
        component: AddMedicineGroup,
        data: {
          title: 'Add Medicine Group'
        }
      },
      {
        path: 'add-company',
        component: AddCompanyComponent,
        data: {
          title: 'Add Company'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
