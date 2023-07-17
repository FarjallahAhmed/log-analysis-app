import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';
import { ChartComponent } from './components/chart/chart.component';
import { FilterComponent } from './components/filter/filter.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './components/home/home.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadDataComponent } from './components/load-data/load-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MetricsComponent } from './components/metrics/metrics.component';
import { AlertingComponent } from './components/alerting/alerting.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
@NgModule({
  declarations: [
    DashboardComponent,
    LogsTableComponent,
    ChartComponent,
    FilterComponent,
    SummaryComponent,
    HomeComponent,
    LoadDataComponent,
    MetricsComponent,
    AlertingComponent,
    ChatbotComponent,

  ],
  exports:[
    LogsTableComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    ChartModule,
    DialogModule,
    ButtonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule
  ]
})
export class DashboardModule { }
