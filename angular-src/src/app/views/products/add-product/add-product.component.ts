import {Component, OnInit, ViewChild} from '@angular/core';
import {AddProductsModel} from "../../../models/add-products.model";
import {ProductService} from "../../../services/product.service";
import {NotificationsService} from "angular2-notifications";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {forEach} from "@angular/router/src/utils/collection";
import {CompanyModel} from "../../../models/company.model";
import {CompanyService} from "../../../services/company.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  addProducts: AddProductsModel = new AddProductsModel();
  addProductList: AddProductsModel [] = [];
  medicineGroupList: MedicineGroupModel[] = [];
  companyList: CompanyModel[] = [];


  constructor(
    private notificationService: NotificationsService,
    private productService: ProductService,
    private medicineGroupService: MedicineGroupService,
    private companyService: CompanyService,
    private http: HttpClient

  ){}

  ngOnInit() {
    // this.getAddProduct();

   this.getMedicineGroups();

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8080/api/medicine/view?key=',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.addProductList = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'name' },{ data: 'group' },{ data: 'company' }]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
