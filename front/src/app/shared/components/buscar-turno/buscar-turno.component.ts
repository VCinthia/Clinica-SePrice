import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-turno',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent, ReactiveFormsModule],
  templateUrl: './buscar-turno.component.html',
  styleUrl: './buscar-turno.component.scss'
})
export class BuscarTurnoComponent {

  constructor(private router: Router){

  }

  dniFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);

  navegarAConfirmarPaciente(value : any){
    if (this.router.url === '/estudiosClinicos/acreditarTurno' && value !== '1') {
      this.router.navigate(['estudiosClinicos/acreditarTurno/confirmarTurno']);
    } else {
      this.router.navigate(['estudiosClinicos/acreditarTurno/turnoNoEncontrado']);
    };
    if (this.router.url === '/consultoriosExternos/acreditarTurno' && value !== '1') {
      this.router.navigate(['consultoriosExternos/acreditarTurno/confirmarTurno']);
    } else {
      this.router.navigate(['consultoriosExternos/acreditarTurno/turnoNoEncontrado']);
    }
  }

  volver(){
    if (this.router.url === '/estudiosClinicos/acreditarTurno') {
      this.router.navigate(['estudiosClinicos']);
    }
    if (this.router.url === '/consultoriosExternos/acreditarTurno') {
      this.router.navigate(['consultoriosExternos']);
    }
  }
}
