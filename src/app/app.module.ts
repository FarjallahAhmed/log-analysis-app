import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AuthentificationComponent } from './auth/authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from './auth/services/authentification.service';
import { AuthGuard } from './core/guards/auth.guard';
import { httpInterceptBasic } from './core/intercepts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    AuthentificationService,
    AuthGuard,
    httpInterceptBasic
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
