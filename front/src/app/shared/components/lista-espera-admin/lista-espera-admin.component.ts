import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-espera-admin',
  standalone: true,
  imports: [MatTableModule, FormsModule],
  templateUrl: './lista-espera-admin.component.html',
  styleUrl: './lista-espera-admin.component.scss'
})
export class ListaEsperaAdminComponent {

  ElementData = [
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
    {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  ]

  displayedColumns = ['paciente', 'horario', 'profesional','numAtencion'];
  dataSource = this.ElementData;

}
