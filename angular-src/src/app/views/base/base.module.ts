// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';


// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import {TablesComponent} from "./tables.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    TablesComponent,
  ]
})
export class BaseModule { }
