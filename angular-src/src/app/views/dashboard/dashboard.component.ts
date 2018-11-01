import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/js/src/utilities/';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips/js/';
import {NotificationsService} from "angular2-notifications";
import {CartService} from "../../services/cart.service";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  firstDayOfWeek: Date = this.getMonday(new Date());

  public lineChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'This Week'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Last Week'}
  ];
  public lineChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#7dc0c1ad',
      borderColor: '#3eb7ba',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#c2e0e1cc',
      borderColor: '#74c8c9',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



  constructor(
    private notificationService: NotificationsService,
    private artService: CartService,
    private dashboardService: DashboardService){}


  ngOnInit(): void {
    setTimeout(()=>{
      this.notificationService.success('Success', 'Succesfully Loged In')
    },1000)
    console.log(this.artService)
    this.updateChart();
  }

  getMonday(d) {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  updateChart(){
    const fromDate = this.firstDayOfWeek;
    fromDate.setDate(fromDate.getDate() -7);
    let dates = [];

    for(let i = 0; i<14; i++){
      fromDate.setDate(fromDate.getDate() + 1);
      dates.push(fromDate.getFullYear()+'-'+(fromDate.getMonth()+1)+'-'+(fromDate.getDate()))
    }

    this.dashboardService.chartData(dates).subscribe((res)=>{
      let i = 0;
      let currentWeekDays =[];
      let preWeekDays =[];
      res.data.forEach((val)=>{
        if(i<7){
          currentWeekDays.push(val);
        }else{
          preWeekDays.push(val);
        }
        i++;
      })
      this.lineChartData = [
        {data: currentWeekDays, label: 'This Week'},
        {data: preWeekDays, label: 'Last Week'}
      ];
      console.log(this.lineChartData)
    })

  }

}
