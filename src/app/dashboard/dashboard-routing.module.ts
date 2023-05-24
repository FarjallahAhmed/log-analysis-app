import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';
import { LoadDataComponent } from './components/load-data/load-data.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { FilterComponent } from './components/filter/filter.component';
import { AlertingComponent } from './components/alerting/alerting.component';


const routes: Routes = [
  { path: '',
  component: DashboardComponent,
  children : [
    {path: 'filter', component: FilterComponent },
    {path: 'chart', component: ChartComponent},
    {path: 'home', component: HomeComponent },
    {path: 'load-data', component: LoadDataComponent},
    {path: 'alert',component:AlertingComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
