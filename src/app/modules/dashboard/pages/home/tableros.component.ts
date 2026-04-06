import { Component, signal, computed } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { AppRoutingModule } from "../../../../app-routing.module";


@Component({
  selector: 'app-tableros',
  //standalone: true,
  //imports: [CommonModule, AppRoutingModule],
  template: `
<div class="container-fluid">
  <div class="mb-3">
    <div class="h5 mb-0">Inicio</div>
  </div>
  <!-- Segunda fila -->
   <div class="row">
    <div class="col-6">
   <div class="col-12 d-flex flex-column gap-2">
      <div class="col-12">
      <a class="board-card" [routerLink]="['/dashboard/tablerosdivis']">
        <div class="board-icon">
        <img src="assets/icons/Icono_DIVIS.png" alt="Icon" class="icon">
        </div>
        <div class="board-info">
          <div class="board-title">DIVIS </div>
          <div class="board-desc text-muted">Dirección de Inversiones en vivienda de Interes Social.</div>
        </div>
      </a>
</div>    
      <div class="col-12">
      <a class="board-card" [routerLink]="['/dashboard/tablerosspat']">
        <div class="board-icon">
        <img src="assets/icons/Icono_SPAT.png" alt="Icon" class="icon">
        </div>
        <div class="board-info">
          <div class="board-title">SPAT</div>
          <div class="board-desc text-muted">Subdirección de Promoción y Apoyo Técnico</div>
        </div>
      </a>
</div>
      <div class="col-12">
      <a class="board-card" [routerLink]="['/dashboard/tablerosoap']">
        <div class="board-icon">
        <img src="assets/icons/Icono_OAP_v1.png" alt="Icon" class="icon">
        </div>
        <div class="board-info">
          <div class="board-title">OAP</div>
          <div class="board-desc text-muted">Oficina Asesora de Planeación</div>
        </div>
      </a>
</div>
      <div class="col-12">
      <a class="board-card">
        <div class="board-icon">
        <img src="assets/icons/Icono_SSFV_v1.png" alt="Icon" class="icon">
        </div>
        <div class="board-info">
          <div class="board-title">SSFV</div>
          <div class="board-desc text-muted">Subdirección de subsidio Familiar de Vivienda</div>
        </div>
      </a>
</div>
      <div class="col-12">
      <a class="board-card" [routerLink]="['../../dashboard/tableros/visor-vivienda-rural-nueva-para-la-planeacion-estrategica']">
        <div class="board-icon">
        <img src="assets/icons/Icono_Vivienda_Rural.png" alt="Icon" class="icon">
        </div>
        <div class="board-info">
          <div class="board-title">SSEVR</div>
          <div class="board-desc text-muted">Subdireccion de Subsidio y Ejecución Vivienda Rural</div>
        </div>
      </a>
</div>
  </div>
    </div> 
    <div class="col-6">
<img src="assets/img/fondo1.jpeg" 
          alt="Fondo" 
          class="w-100 h-100" 
          style="object-fit: cover; display: block;" />
    </div> 
   </div> 
  `,
  styles: [`
.board-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #fff;
  border-radius: 0.75rem;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: inherit;
  min-height: 86px;
}

.board-card:hover {
  border-color: rgba(11, 95, 165, 0.25);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.08);
}

.board-icon {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(99, 102, 241, 0.12);
  color: #6366f1;
  font-size: 1.35rem;
  flex: 0 0 auto;
}

.board-title {
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.2;
}

.board-desc {
  font-size: 0.88rem;
  line-height: 1.2;
}
.icon{
  width: 40px;
  height: 40px;
}    
  `]
})
export class TablerosComponent {

}
