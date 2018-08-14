import { Component } from '@angular/core';
import {MedicineModel} from "../../../models/medicine.model";
import {MedicineService} from "../../../services/medicine.service";

@Component({
  templateUrl: 'new-sales.component.html'
})
export class NewSalesComponent {

  medicineList: MedicineModel[] = []
  searchKey: string;




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

  constructor(private medicineService: MedicineService) {}


  ngOnInit() {
   this.getMedicine();

  }



  getMedicine(){
    this.medicineService.viewMedicines().subscribe((res)=> {
      this.medicineList = res.data;
    })
  }

  onSelectionChangedMedicine(value){}

}
