import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { BoardsAdminComponent } from './pages/boards-admin/boards-admin.component';
import { BoardViewerComponent } from './pages/board-viewer/board-viewer.component';
import { HomeComponent } from './pages/home/home.component';
import { TablerosComponent } from './pages/home/tableros.component';
import { TablerosDivisComponent } from './pages/home/tableros-divis.component';
import { TablerosSpatComponent } from './pages/home/tableros-spat.component';
import { TablerosOapComponent } from './pages/home/tableros-oap.component';
import { ConsultasExternasComponent } from './pages/home/consultas-externas.component';
import { TablerosCreangelComponent } from './pages/home/tableros-creangel.component';
import { TablerosAguaSaniamientoBasicoComponent } from './pages/home/tableros-aguasaniamientobasico.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', component: HomeComponent },
      { path: 'tableros', component: BoardsAdminComponent },
      { path: 'tableros/:id', component: BoardViewerComponent },
      { path: 'tablerostipo', component: TablerosComponent },
      { path: 'tablerosdivis', component: TablerosDivisComponent },
      { path: 'tablerosspat', component: TablerosSpatComponent },
      { path: 'tablerosoap', component: TablerosOapComponent },
      { path: 'tableroscreangel', component: TablerosCreangelComponent },
      { path: 'tablerosaguasaniamientobasico', component: TablerosAguaSaniamientoBasicoComponent },
      { path: 'consultasexternas', component: ConsultasExternasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
