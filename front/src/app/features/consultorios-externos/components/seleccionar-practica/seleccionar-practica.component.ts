import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../../shared/components/btn-secondary/btn-secondary.component';

interface Practica {
  name: string;
}

interface Tiempo {
  value: number;
}

@Component({
  selector: 'app-seleccionar-practica',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
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

  tiempoControl = new FormControl<Tiempo | null>(null, Validators.required);
  selectFormControl2 = new FormControl('', Validators.required);
  tiempos: Tiempo[] = [
    {value: 10},
    {value: 20},
    {value: 40}
  ]
}
