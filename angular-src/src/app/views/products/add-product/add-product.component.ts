import {Component, OnInit} from '@angular/core';
import {AddProductsModel} from "../../../models/add-products.model";
import {ProductService} from "../../../services/product.service";
import {NotificationsService} from "angular2-notifications";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";

@Component({
  templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit {
  addProducts: AddProductsModel = new AddProductsModel();
  addProductList: AddProductsModel [] = [];
  medicineGroupList: MedicineGroupModel[] = [];

  constructor(
    private notificationService: NotificationsService,
    private productService: ProductService,
    private medicineGroupService: MedicineGroupService){}

  ngOnInit() {
    this.getAddProduct();

   this.getMedicineGroups();

  }

  getAddProduct() {
    this.productService.viewAddProduct().subscribe((res)=> {
      this.addProductList = res.data;
    })
  }

  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup(this.addProducts.groupName).subscribe((res)=>{
      this.medicineGroupList = res.data;
    });
  }


  saveNewProduct() {
    console.log(this.addProducts)
    this.productService.saveProduct(this.addProducts).subscribe((res)=> {
      if (res.success == true) {
        this.notificationService.success('Success', res.message);
        this.getAddProduct();
        this.addProducts = new AddProductsModel;
      }else {
        this.notificationService.alert('Failed', 'Something went wrong try again');
      }
    })
  }

  filterMedicineGroup(){
    alert('clicked')
  }


  //
  // private _filterMedicineGroup(value: string): MedicineGroupModel[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.medicineGroupList.filter(medicineGrou => medicineGrou.name.toLowerCase().indexOf(filterValue) === 0);
  // }

}
