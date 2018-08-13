import {Component, OnInit} from '@angular/core';
import {AddProductsModel} from "../../../models/add-products.model";
import {ProductService} from "../../../services/product.service";
import {NotificationsService} from "angular2-notifications";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {forEach} from "@angular/router/src/utils/collection";
import {CompanyModel} from "../../../models/company.model";
import {CompanyService} from "../../../services/company.service";

@Component({
  templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit {
  addProducts: AddProductsModel = new AddProductsModel();
  addProductList: AddProductsModel [] = [];
  medicineGroupList: MedicineGroupModel[] = [];
  companyList: CompanyModel[] = [];


  constructor(
    private notificationService: NotificationsService,
    private productService: ProductService,
    private medicineGroupService: MedicineGroupService,
    private companyService: CompanyService
  ){}

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

  getCompany(){
    this.companyService.viewCompany(this.addProducts.companyName).subscribe((res)=>{
      this.companyList = res.data;
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


  onSelectionChangedMedicineGroup(groupName){

    if(this.medicineGroupList.length > 0){
      this.medicineGroupList.forEach(medicineGroup => {
        if(medicineGroup.name == groupName)
          this.addProducts.groupId = medicineGroup._id;
      })
    }

  }


  onSelectionChangedCompany(companyName){

    if(this.companyList.length > 0){
      this.companyList.forEach(company => {
        if(company.name == companyName)
          this.addProducts.companyId = company._id;
      })
    }

  }


}
