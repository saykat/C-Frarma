import {Component, OnInit, ViewChild} from '@angular/core';
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {NotificationsService} from "angular2-notifications";
import {MatSort, MatTableDataSource} from "@angular/material";
import {MedicineGroupService} from "../../../services/medicine-group.service";


@Component({
  templateUrl: 'add-medicine-group.component.html'
})
export class AddMedicineGroup implements OnInit{

  MedicineGroup: MedicineGroupModel = new MedicineGroupModel();
  medicineGroupList: MedicineGroupModel[] = [];
  constructor(private notification: NotificationsService, private medicineGroupService: MedicineGroupService) { }

  ngOnInit() {
    this.getMedicineGroups();
  }

  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup().subscribe((res)=>{
      this.medicineGroupList = res.data;
    });
  }

  saveMedicineGroup(){
    console.log(this.MedicineGroup)
    this.medicineGroupService.saveMedicineGroup(this.MedicineGroup).subscribe((res)=>{
      if(res.success == true){
        this.notification.success('Success', res.message);
        this.getMedicineGroups();
        this.MedicineGroup = new MedicineGroupModel;
      }
    });
  }
}



