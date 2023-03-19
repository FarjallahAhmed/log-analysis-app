import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderService } from './services/header.service';
import { FooterService } from './services/footer.service';
import { SidebarService } from './services/sidebar.service';
import { BreadcrumbService } from './services/breadcrumb.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbComponent
  ],
  providers: [
    HeaderService,
    FooterService,
    SidebarService,
    BreadcrumbService
  ]
})
export class LayoutModule { }
