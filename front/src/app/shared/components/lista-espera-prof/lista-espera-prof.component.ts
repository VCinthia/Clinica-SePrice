import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';

@Component({
  selector: 'app-lista-espera-prof',
  standalone: true,
  imports: [MatTableModule, FormsModule, RouterModule, BtnPrimaryComponent],
  templateUrl: './lista-espera-prof.component.html',
  styleUrl: './lista-espera-prof.component.scss'
})
export class ListaEsperaProfComponent {

  btnInvisible: boolean = false;
  currentRoute: string | undefined;

  constructor(
    private router : Router,
    
  ){
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if (this.currentRoute === '/consultoriosExternos/listaEsperaProf' || this.currentRoute === '/estudiosClinicos/listaEsperaProf') {
      this.btnInvisible = false;
    }
  }

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

  comenzarLlamados(){
    this.btnInvisible = true;
    if (this.router.url === '/estudiosClinicos/listaEsperaProf') {
      this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente']);
    } 
    if (this.router.url === '/consultoriosExternos/listaEsperaProf') {
      this.router.navigate(['consultoriosExternos/listaEsperaProf/llamarPaciente']);
    }
  }
}
