import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { BtnPrimaryComponent } from '../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../shared/components/btn-secondary/btn-secondary.component';
import { Router } from '@angular/router';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';

@Component({
  selector: 'app-menu-turnos',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent, BtnInactiveComponent],
  templateUrl: './menu-turnos.component.html',
  styleUrl: './menu-turnos.component.css'
})
export class MenuTurnosComponent {
  
  constructor(private router: Router) {}


  navegarANuevoTurno() {
    if (this.router.url === '/estudiosClinicos/gestionarTurnos') {
      this.router.navigate(['estudiosClinicos/nuevoTurno']);
    }
    if (this.router.url === '/consultoriosExternos/gestionarTurnos') {
      this.router.navigate(['consultoriosExternos/nuevoTurno']);
    }
  }
  
  volver(){
    if (this.router.url === '/estudiosClinicos/gestionarTurnos') {
      this.router.navigate(['estudiosClinicos']);
    }
    if (this.router.url === '/consultoriosExternos/gestionarTurnos') {
      this.router.navigate(['consultoriosExternos']);
    }
  }
}
