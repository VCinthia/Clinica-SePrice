import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-lista-espera-prof',
  standalone: true,
  imports: [MatTableModule, FormsModule, RouterModule, BtnPrimaryComponent, CommonModule],
  templateUrl: './lista-espera-prof.component.html',
  styleUrl: './lista-espera-prof.component.scss',
})
export class ListaEsperaProfComponent {

  btnInvisible: boolean = false;
  currentRoute: string | undefined;
  usuarioLogueado : UsuarioDTO | null  = new UsuarioDTO;
  hoy: Date = new Date();
  turnosList : TurnoDTO[] = [];
  turnosListData: any = [];
  dataSource: any = [];
  displayedColumns: string[] = ['paciente', 'horario', 'profesional', 'numAtencion'];

  constructor(
    private router : Router,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,

  ){
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if (this.currentRoute === '/consultoriosExternos/listaEsperaProf' || this.currentRoute === '/estudiosClinicos/listaEsperaProf') {
      this.btnInvisible = false;
    }

    //busqueda de usuario:
    this.usuarioLogueado = this.usuarioService.getUsuarioLogeado();
    this.turnosList = this.turnoService.getTurnos();

  console.log("turnosList:", this.turnosList);
  this.setearYOrdenarListaTurnosPorFecha();

  }


  setearYOrdenarListaTurnosPorFecha(){

    //Ordenar Turnos
      this.turnosList.sort((a, b) => {
        const fechaA = new Date(a.inicioFechaHora!).getTime();
        const fechaB = new Date(b.inicioFechaHora!).getTime();
        return fechaA - fechaB; // Orden ascendente
      });
      console.log("TurnosListOrdenada:",this.turnosList);

      //CREO LISTA PERSONALIZADA
      this.turnosListData = this.turnosList.map((turno, index) => {
        const paciente = `${turno.paciente?.persona?.nombre}, ${turno.paciente?.persona?.apellido}`;
        const profesional = `Dr. ${turno.profesional?.persona?.nombre}, ${turno.profesional?.persona?.apellido}`;
        const turnoIdCustom = `T-${index+1}`; // Usar el índice en lugar del id del turno
        return {
          'paciente': paciente,
          'horario': turno.inicioFechaHora,
          'profesional': profesional,
          'numAtencion': turnoIdCustom
        };
      });

      // Asignar la lista ordenada al dataSource
      this.dataSource = this.turnosListData;

  }

  // ElementData = [
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  //   {paciente: 'María García', horario: '15:00hs', profesional: 'Dr. González', numAtencion: 'T-002'},
  // ]




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
