import {Component, OnInit, ViewChild} from '@angular/core';
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {NotificationsService} from "angular2-notifications";
import {MatSort, MatTableDataSource} from "@angular/material";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";


@Component({
  templateUrl: 'add-medicine-group.component.html'
})
export class AddMedicineGroup implements OnInit{

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  MedicineGroup: MedicineGroupModel = new MedicineGroupModel();
  medicineGroupList: MedicineGroupModel[] = [];
  viewGroup: MedicineGroupModel = new MedicineGroupModel();
  create = true;


  constructor(
    private notificationService: NotificationsService,
    private medicineGroupService: MedicineGroupService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    // this.getMedicineGroups();



    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8080/api/medicine-group/view?key=',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.medicineGroupList = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{},{ data: 'name' }, { data: 'description' },{}]
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


  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup().subscribe((res)=>{
      this.medicineGroupList = res.data;
    });
  }

  saveMedicineGroup(){
    console.log(this.MedicineGroup)
    this.MedicineGroup.status = 1;
    this.medicineGroupService.saveMedicineGroup(this.MedicineGroup).subscribe((res)=>{
      if(res.success == true){
        this.notificationService.success('Success', res.message);
        this.getMedicineGroups();
        this.MedicineGroup = new MedicineGroupModel;
      }
    });
  }


  setView(index){
    this.viewGroup = this.medicineGroupList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.MedicineGroup = this.medicineGroupList[index];
    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.MedicineGroup = new MedicineGroupModel();
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    this.MedicineGroup = this.medicineGroupList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    this.MedicineGroup.status = 0;

    this.medicineGroupService.saveMedicineGroup(this.MedicineGroup).subscribe((res)=>{
      if(res.success == true){
        this.rerender();
        this.MedicineGroup = new MedicineGroupModel();

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      }else{
        this.notificationService.error('Error', 'Please try again');
      }
    });

  }
}



