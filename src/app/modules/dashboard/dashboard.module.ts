import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardsAdminComponent } from './pages/boards-admin/boards-admin.component';
import { BoardViewerComponent } from './pages/board-viewer/board-viewer.component';
import { TablerosComponent } from './pages/home/tableros.component';
import { TablerosDivisComponent } from './pages/home/tableros-divis.component';
import { TablerosSpatComponent } from './pages/home/tableros-spat.component';
import { TablerosOapComponent } from './pages/home/tableros-oap.component';
import { ConsultasExternasComponent } from './pages/home/consultas-externas.component';
import { TablerosCreangelComponent } from './pages/home/tableros-creangel.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    BoardsAdminComponent,
    BoardViewerComponent,
    TablerosComponent,
    TablerosDivisComponent,
    TablerosSpatComponent,
    TablerosOapComponent,
    TablerosCreangelComponent, 
    ConsultasExternasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
