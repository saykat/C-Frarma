import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/js/src/utilities/';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips/js/';
import {NotificationsService} from "angular2-notifications";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {


  constructor(private notificationService: NotificationsService){}
  ngOnInit(): void {
    setTimeout(()=>{
      this.notificationService.success('Success', 'Succesfully Loged In')
    },1000)
  }

}
