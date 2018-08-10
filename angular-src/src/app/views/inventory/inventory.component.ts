import { Component } from '@angular/core';

@Component({
  templateUrl: 'inventory.component.html'
})
export class InventoryComponent {


  displayedColumns = ['No', 'Name', 'Group', 'Company', 'Power', 'Qty', 'Price'];
  dataSource = [
    {position: 1, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 2, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 3, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 4, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 5, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 6, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 7, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 8, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},
    {position: 9, name: 'Napa', group: 'Paracitamol', company: 'Beximco', power: '500mg', qty: 5, price: 2},

  ];


  constructor() { }

}
