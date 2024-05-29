import { Component } from '@angular/core';
import { SeleccionSectorComponent } from '../seleccion-sector/seleccion-sector.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SeleccionSectorComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
