import { Component } from '@angular/core';
import {MedicineModel} from "../../../models/medicine.model";
import {MedicineService} from "../../../services/medicine.service";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {CompanyService} from "../../../services/company.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {CompanyModel} from "../../../models/company.model";

@Component({
  templateUrl: 'new-sales.component.html'
})
export class NewSalesComponent {

  medicineList: MedicineModel[] = []
  searchKey: string;
  groupKey: string;
  companyKey: string;
  groupName: string;
  companyName: string;

  medicineGroupList: MedicineGroupModel[] = [];
  companyList: CompanyModel[] = [];



  displayedColumns = ['No', 'Name', 'Group', 'Company', 'Power', 'Qty', 'Price', 'SubTotal'];
  dataSource = [
    {position: 1, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 2, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 3, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 4, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 5, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 6, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 7, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 8, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},
    {position: 9, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2, subtotal: 10},

  ];

  constructor(private medicineService: MedicineService,
              private medicineGroupService: MedicineGroupService,
              private companyService: CompanyService) {}


  ngOnInit() {
   this.getMedicine();

  }



  getMedicine(){
    this.medicineService.viewMedicines(this.searchKey, this.groupKey, this.companyKey).subscribe((res)=> {
      this.medicineList = res.data;
    })
  }

  onSelectionChangedMedicine(value){}

  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup(this.groupName).subscribe((res)=>{
      this.medicineGroupList = res.data;
    });
  }

  getCompany(){
    this.companyService.viewCompany(this.companyName).subscribe((res)=>{
      this.companyList = res.data;
    });
  }




  onSelectionChangedMedicineGroup(groupName){

    if(this.medicineGroupList.length > 0){
      this.medicineGroupList.forEach(medicineGroup => {
        if(medicineGroup.name == groupName)
          this.groupKey = medicineGroup._id;
      })
    }

  }


  onSelectionChangedCompany(companyName){

    if(this.companyList.length > 0){
      this.companyList.forEach(company => {
        if(company.name == companyName)
          this.companyKey = company._id;
      })
    }

  }

}
