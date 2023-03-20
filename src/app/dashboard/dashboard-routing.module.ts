import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';


const routes: Routes = [
  { path: '',
  component: DashboardComponent,
  children : [
    {path: 'logs-table', component: LogsTableComponent },
    {path: 'chart', component: ChartComponent},
    {path: 'home', component: HomeComponent }
  ]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
