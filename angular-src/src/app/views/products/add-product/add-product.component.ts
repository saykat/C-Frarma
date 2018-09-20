import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from "../../../models/add-products.model";
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
import {NgxSmartModalService} from "ngx-smart-modal";

@Component({
  templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  product: ProductModel = new ProductModel();
  productList: ProductModel [] = [];
  medicineGroupList: MedicineGroupModel[] = [];
  companyList: CompanyModel[] = [];

  viewProduct: ProductModel = new ProductModel();
  create = true;

  constructor(
    private notificationService: NotificationsService,
    private productService: ProductService,
    private medicineGroupService: MedicineGroupService,
    private companyService: CompanyService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService

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
          that.productList = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{},{ data: 'name' },{ data: 'group' },{ data: 'company' },{},{},{}]
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
      this.productList = res.data;
    })
  }

  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup(this.product.groupName).subscribe((res)=>{
      this.medicineGroupList = res.data;
    });
  }

  getCompany(){
    this.companyService.viewCompany(this.product.companyName).subscribe((res)=>{
      this.companyList = res.data;
    });
  }


  saveNewProduct() {
    console.log(this.product)
    this.product.status = 1;
    this.productService.saveProduct(this.product).subscribe((res)=> {
      if (res.success == true) {
        this.notificationService.success('Success', res.message);
        this.getAddProduct();
        this.product = new ProductModel;
      }else {
        this.notificationService.alert('Failed', 'Something went wrong try again');
      }
    })
  }


  onSelectionChangedMedicineGroup(groupName){

    if(this.medicineGroupList.length > 0){
      this.medicineGroupList.forEach(medicineGroup => {
        if(medicineGroup.name == groupName)
          this.product.groupId = medicineGroup._id;
      })
    }

  }


  onSelectionChangedCompany(companyName){

    if(this.companyList.length > 0){
      this.companyList.forEach(company => {
        if(company.name == companyName)
          this.product.companyId = company._id;
      })
    }

  }



  setView(index){
    this.viewProduct = this.productList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.product = this.productList[index];
    this.product.medicineName = this.productList[index].name;
    this.product.groupId = this.productList[index].group._id;
    this.product.groupName = this.productList[index].group.name;
    this.product.companyName = this.productList[index].company.name;
    this.product.companyId = this.productList[index].company._id;

    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.product = new ProductModel();
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    this.product = this.productList[index];
    this.product.medicineName = this.productList[index].name;
    this.product.groupId = this.productList[index].group._id;
    this.product.groupName = this.productList[index].group.name;
    this.product.companyName = this.productList[index].company.name;
    this.product.companyId = this.productList[index].company._id;

    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    this.product.status = 0;

    this.productService.saveProduct(this.product).subscribe((res)=>{
      if(res.success == true){
        this.rerender();
        this.product = new ProductModel();

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      }else{
        this.notificationService.error('Error', 'Please try again');
      }
    });

  }


}

