import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { ToastrService } from 'ngx-toastr';
import { TurnoListaDeEspera } from '../../../core/dtos/turno-lista-espera.dto';
import { TurnoService } from '../../services/turno.service';
import { CommonModule } from '@angular/common';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';
import { ApiService } from '../../../services/api.service';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';

@Component({
  selector: 'app-llamado-paciente-2',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent, CommonModule],
  templateUrl: './llamado-paciente-2.component.html',
  styleUrl: './llamado-paciente-2.component.scss'
})
export class LlamadoPaciente2Component {
  turnosListEspera : TurnoListaDeEspera[] = [];
  turnoUno : TurnoListaDeEspera | undefined;
  textHistoriaClinicaDB : string = '';
  segundoLlamadoRealizado : boolean = false;

  constructor(
    private router: Router,
    private toastr : ToastrService,
    private turnoService: TurnoService,
    private apiService: ApiService,
    private historiaClinicaService: HistoriaClinicaService,
  ){
  }


  

  ngOnInit(): void {
  //OBSERVABLES
  this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
    this.turnosListEspera = turnosEnListaDeEspera;
    this.turnoUno = turnosEnListaDeEspera[0];
  });
   
  
    }

    



  confirmarAtencion(){
    //obtener historia clinica
    this.getHistoriaClinicaByDNI(this.turnoUno?.pacienteDNI!);

    if (this.router.url === '/estudiosClinicos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['estudiosClinicos/historiaClinica']);
    } 
    if (this.router.url === '/consultoriosExternos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['consultoriosExternos/historiaClinica']);
    }
  }

  realizarSegundoLlamado(){
    this.segundoLlamadoRealizado = true;
    this.toastr.success('Segundo llamado a paciente realizado');
  }


  eliminarTurnoDeListaEspera() {
    const turnoEliminar = this.turnosListEspera[0];
    this.turnoService.removeTurnosEnListaDeEspera(turnoEliminar.idTurno);

    //Cambiar Estado  al back:
    this.actualizarEstadoTurno(turnoEliminar.idTurno, eEstadoTurno.CANCELADO);
    if (this.router.url === '/estudiosClinicos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['estudiosClinicos/listaEsperaProf']);
    } 
    if (this.router.url === '/consultoriosExternos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['consultoriosExternos/listaEsperaProf']);
      
    }
    //actualizo observables
    this.turnoService.removeTurno(turnoEliminar.idTurno);
    this.turnoService.removeTurnosEnListaDeEspera(turnoEliminar.idTurno);
    this.turnoService.setShowBtnComenzarLLamadas(true);
    
  }


  
  actualizarEstadoTurno(idTurno: number, estadoNuevo: eEstadoTurno) : void { 
    const estadoString : string = estadoNuevo;  
    this.apiService.actualizarEstadoDelTurno(idTurno,estadoNuevo).subscribe({
      next: (response) =>{
        if(!response.success){
          this.toastr.error('No se pudo actualizar el estado ','Error' );
        }
          this.toastr.success("El turno ha sido "+ estadoString)
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error alactualizar estado del turno', error);
      },
      complete: () => {
      }
    });
  }



  getHistoriaClinicaByDNI(dniPaciente: number):void{
    this.apiService.getHistoriaClinicaByDni(dniPaciente).subscribe({
      next: (response) =>{
        if(!response.data){
          this.toastr.error('Error al obtener la historia clínica','Error' );
          return;
        }
        this.toastr.success('Historia clínica encontrada')
        console.log("HC-DB: ",response);
        this.textHistoriaClinicaDB = response.data?.detalle ? response.data?.detalle  : "";
        this.historiaClinicaService.setHistoriaClinicaDBEdit(response.data);
      },
      error:(error) => {
        this.toastr.error(error.error?.message, 'Error' );
        console.error('Error en el get Historiaclinica:', error);
      },
      complete: () => {
      }
    });
   }

}
