import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { TurnoService } from '../../services/turno.service';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { eTipoTurno } from '../../../core/enums/tipo-turno.enum';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-espera-admin',
  standalone: true,
  imports: [MatTableModule, FormsModule, CommonModule],
  templateUrl: './lista-espera-admin.component.html',
  styleUrl: './lista-espera-admin.component.scss'
})
export class ListaEsperaAdminComponent {
  currentRoute: string | undefined;
  usuarioLogueado : UsuarioDTO | null  = new UsuarioDTO;
  turnosConfirmadosListData: any = [];
  dataSource: any = [];
  displayedColumns: string[] = ['pacienteNombre', 'horario', 'profesional', 'numAtencion'];
 
  constructor(
    private apiService: ApiService,
    private router : Router,
    private toastr : ToastrService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,

  ){
  }


  ngOnInit(): void {
    //OBSERVABLES
    this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
      this.dataSource = turnosEnListaDeEspera;
    });
  
    this.usuarioService.usuarioLogeado$.subscribe((usuarioLogueado) => {
      this.usuarioLogueado= usuarioLogueado;
    });  
    //------------
    this.currentRoute = this.router.url;



  //busqueda de lista de espera.  Seteo en ServiceTurnos y dataSourse
    if (this.currentRoute?.includes('estudiosClinicos')) {
      this.getTurnosByTipoConfirmadosHoy(eTipoTurno.ESTUDIO);
    } else if (this.currentRoute?.includes('consultoriosExternos')) {
      this.getTurnosByTipoConfirmadosHoy(eTipoTurno.CONSULTA);
    }
    
    }





    getTurnosByTipoConfirmadosHoy(tipo:eTipoTurno): void {
      this.apiService.getTurnosByTipoAndDayAndEstado(tipo, eEstadoTurno.CONFIRMADO, new Date()).subscribe({
        next: (response) => {
          if (!response) {
            this.toastr.error('No se ha podido obtener turnos confirmados', 'Error');
            return;
          }

          if (response.length) {
            let turnosConfirmados = response;
            this.toastr.success('Hay ' + turnosConfirmados.length + ' turnos en la lista de espera de hoy');
            //Actualizo el servicio "TURNOS" con los turnos confirmados de la Base 
            this.setListaDeEsperaEnServicioTurno(turnosConfirmados);
            console.log('TurnosConfirmados: ', turnosConfirmados);
          } else {
            this.toastr.warning('No hay turnos en la lista de espera');
          }
        },
        error: (error: { error: { message: string | undefined; }; }) => {
          this.toastr.warning(error.error?.message);
          console.error('Error al obtener turnos confirmados para hoy', error);
        },
      });
    }
  


  
    setListaDeEsperaEnServicioTurno(turnosListDB : TurnoDTO[] ){
      //Ordenar Turnos
      turnosListDB.sort((a, b) => {
        const fechaA = new Date(a.inicioFechaHora!).getTime();
        const fechaB = new Date(b.inicioFechaHora!).getTime();
        return fechaA - fechaB; // Orden ascendente
      });
      
      //CREO LISTA PERSONALIZADA
      this.turnosConfirmadosListData = turnosListDB.map((turno, index) => {
        const pacienteNombre = `${turno.paciente?.persona?.nombre}, ${turno.paciente?.persona?.apellido}`;
        const pacienteDNI = `${turno.paciente?.persona?.dni}`;
        const profesional = `Dr. ${turno.profesional?.persona?.nombre}, ${turno.profesional?.persona?.apellido}`;
        const turnoIdCustom = `T-${turno.turnoId}`; // Usar el índice en lugar del id del turno index+1
        return {
          'pacienteNombre': pacienteNombre,
          'pacienteDNI': pacienteDNI,
          'horario': turno.inicioFechaHora,
          'profesional': profesional,
          'numAtencion': turnoIdCustom,
          'idTurno': turno.turnoId
        };
      });
        // Asignar la lista ordenada al dataSource y al Servicio
        this.dataSource = this.turnosConfirmadosListData;
        this.turnoService.setTurnosEnListaDeEspera(this.turnosConfirmadosListData)
  
    }





}
