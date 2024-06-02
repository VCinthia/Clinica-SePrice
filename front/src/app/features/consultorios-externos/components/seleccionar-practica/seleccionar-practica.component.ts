import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../../shared/components/btn-secondary/btn-secondary.component';
import { BtnInactiveComponent } from '../../../../shared/components/btn-inactive/btn-inactive.component';
import { Router } from '@angular/router';

interface Practica {
  name: string;
}

@Component({
  selector: 'app-seleccionar-practica',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent, BtnInactiveComponent, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './seleccionar-practica.component.html',
  styleUrl: './seleccionar-practica.component.scss'
})
export class SeleccionarPracticaComponent {

  practicaControl = new FormControl<Practica | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  practicas: Practica[] = [
    {name: 'Traumatología'},
    {name: 'Clínica Médica'},
    {name: 'Oftalmología'},
    {name: 'Odontología'},
  ];

  constructor(private router: Router) {}


  navegarASeleccionarTurno() {
    if (this.router.url === '/estudiosClinicos/nuevoTurno') {
      this.router.navigate(['estudiosClinicos/seleccionarTurno']);
    }
    if (this.router.url === '/consultoriosExternos/nuevoTurno') {
      this.router.navigate(['consultoriosExternos/seleccionarTurno']);
    }
  }
  
  volver(){
    if (this.router.url === '/estudiosClinicos/nuevoTurno') {
      this.router.navigate(['estudiosClinicos/gestionarTurnos']);
    }
    if (this.router.url === '/consultoriosExternos/nuevoTurno') {
      this.router.navigate(['consultoriosExternos/gestionarTurnos']);
    }
  }
}
