import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';

@Component({
  selector: 'app-card-datos-turno',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './card-datos-turno.component.html',
  styleUrl: './card-datos-turno.component.scss'
})
export class CardDatosTurnoComponent {

  constructor(private router: Router){

  }

  navegarAConfirmarTurno(){
    if (this.router.url === '/estudiosClinicos/acreditarTurno/confirmarTurno') {
      this.router.navigate(['estudiosClinicos/gestionarPago']);
    }
    if (this.router.url === '/consultoriosExternos/acreditarTurno/confirmarTurno') {
      this.router.navigate(['consultoriosExternos/gestionarPago']);
    }
  }
}
