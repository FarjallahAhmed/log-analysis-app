import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoadDataComponent } from './components/load-data/load-data.component';
import { FilterComponent } from './components/filter/filter.component';
import { AlertingComponent } from './components/alerting/alerting.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';


const routes: Routes = [
  { path: '',
  component: DashboardComponent,
  children : [
    {path: 'filter', component: FilterComponent },
    {path: 'home', component: HomeComponent },
    {path: 'load-data', component: LoadDataComponent},
    {path: 'alert',component:AlertingComponent},
    {path: 'metric',component:MetricsComponent},
    {path: 'chatbot',component:ChatbotComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
