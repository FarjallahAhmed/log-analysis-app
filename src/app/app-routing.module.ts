import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './auth/authentification/authentification.component';
import { AuthGuard } from './core/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  { path: 'login' , component: AuthentificationComponent},
  { path: '', loadChildren: () => DashboardModule , canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
