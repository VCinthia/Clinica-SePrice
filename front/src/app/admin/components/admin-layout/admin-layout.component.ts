import { Component } from '@angular/core';
import { SeleccionSectorComponent } from '../seleccion-sector/seleccion-sector.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SeleccionSectorComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
