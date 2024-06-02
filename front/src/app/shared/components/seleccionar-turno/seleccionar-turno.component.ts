import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-turno',
  standalone: true,
  imports: [MatTableModule, BtnPrimaryComponent,BtnSecondaryComponent, BtnInactiveComponent, FormsModule, MatRadioModule],
  templateUrl: './seleccionar-turno.component.html',
  styleUrl: './seleccionar-turno.component.scss'
})
export class SeleccionarTurnoComponent {

  
  selectedOption: string;

  constructor(
  private router: Router
) {
  this.selectedOption = ''
  };


  ElementData = [
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},
    {fecha: 'Miércoles 22 de mayo', horario: '15:00hs', profesional: 'Dr. González', select: false},

  ]

  displayedColumns = ['fecha', 'horario', 'profesional', 'select'];
  dataSource = this.ElementData;

  

  navegarAIngresarPaciente(){
    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.router.navigate(['estudiosClinicos/ingresarPaciente']);
    }
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.router.navigate(['consultoriosExternos/ingresarPaciente']);
    }
  }
  
  volver(){
    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.router.navigate(['estudiosClinicos/nuevoTurno']);
    }
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.router.navigate(['consultoriosExternos/nuevoTurno']);
    }
  }
}
