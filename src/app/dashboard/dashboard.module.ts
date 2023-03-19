import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';
import { ChartComponent } from './components/chart/chart.component';
import { FilterComponent } from './components/filter/filter.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    DashboardComponent,
    LogsTableComponent,
    ChartComponent,
    FilterComponent,
    SummaryComponent,
  ],
  exports:[
    LogsTableComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule
  ]
})
export class DashboardModule { }
