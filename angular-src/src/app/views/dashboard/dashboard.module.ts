import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardService} from "../../services/dashboard.service";
import {CustomMatrialModule} from "../../custom-matrial.module";


@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CustomMatrialModule,
  ],
  declarations: [ DashboardComponent ],
  providers: [
    DashboardService
    ]
})
export class DashboardModule { }
