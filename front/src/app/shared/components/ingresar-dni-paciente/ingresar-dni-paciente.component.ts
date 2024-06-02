import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresar-dni-paciente',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent, ReactiveFormsModule],
  templateUrl: './ingresar-dni-paciente.component.html',
  styleUrl: './ingresar-dni-paciente.component.scss'
})
export class IngresarDniPacienteComponent {

  constructor(private router: Router){

  }

  dniFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);

  navegarAConfirmarPaciente(value : any){
    if (this.router.url === '/estudiosClinicos/ingresarPaciente' && value !== '1') {
      this.router.navigate(['estudiosClinicos/ingresarPaciente/confirmarPaciente']);
    } else {
      this.router.navigate(['estudiosClinicos/ingresarPaciente/pacienteNoEncontrado']);
    };
    if (this.router.url === '/consultoriosExternos/ingresarPaciente' && value !== '1') {
      this.router.navigate(['consultoriosExternos/ingresarPaciente/confirmarPaciente']);
    } else {
      this.router.navigate(['consultoriosExternos/ingresarPaciente/pacienteNoEncontrado']);
    }
  }

  volver(){
    if (this.router.url === '/estudiosClinicos/ingresarPaciente') {
      this.router.navigate(['estudiosClinicos/seleccionarTurno']);
    }
    if (this.router.url === '/consultoriosExternos/ingresarPaciente') {
      this.router.navigate(['consultoriosExternos/seleccionarTurno']);
    }
  }
}
