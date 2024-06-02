import { Component } from '@angular/core';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-datos-paciente',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './card-datos-paciente.component.html',
  styleUrl: './card-datos-paciente.component.scss'
})
export class CardDatosPacienteComponent {

  constructor(private router: Router){

  }

  navegarAConfirmarTurno(){
    if (this.router.url === '/estudiosClinicos/ingresarPaciente/confirmarPaciente') {
      this.router.navigate(['estudiosClinicos/confirmarTurno']);
    }
    if (this.router.url === '/consultoriosExternos/ingresarPaciente/confirmarPaciente') {
      this.router.navigate(['consultoriosExternos/confirmarTurno']);
    }
  }
}
