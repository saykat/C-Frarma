import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/js/src/utilities/';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips/js/';
import {NotificationsService} from "angular2-notifications";
import {CartService} from "../../services/cart.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor(private notificationService: NotificationsService, private artService: CartService){}
  ngOnInit(): void {
    setTimeout(()=>{
      this.notificationService.success('Success', 'Succesfully Loged In')
    },1000)
    console.log(this.artService)
  }

}
