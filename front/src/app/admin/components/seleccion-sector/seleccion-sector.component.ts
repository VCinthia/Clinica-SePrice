import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../../../shared/components/btn-primary/btn-primary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-sector',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './seleccion-sector.component.html',
  styleUrl: './seleccion-sector.component.scss'
})
export class SeleccionSectorComponent {

  constructor(private router: Router) {}

  navegarAConsultoriosExternos() {
    this.router.navigate(['/consultoriosExternosAdmin']);
  }

  navegarAEstudiosClinicos() {
  this.router.navigate(['/estudiosClinicosAdmin']);
}
}
