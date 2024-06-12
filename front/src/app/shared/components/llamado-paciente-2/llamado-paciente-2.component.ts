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
  
  segundoLlamadoRealizado : boolean = false;

  constructor(
    private router: Router,
    private toastr : ToastrService,
    private turnoService: TurnoService,
    private apiService: ApiService,
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
    console.log("se elimino", this.turnosListEspera);

    //Cambiar Estado  al back:
    this.actualizarEstadoTurno(turnoEliminar.idTurno, eEstadoTurno.CANCELADO);
    if (this.router.url === '/estudiosClinicos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['estudiosClinicos/listaEsperaProf']);
    } 
    if (this.router.url === '/consultoriosExternos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['consultoriosExternos/listaEsperaProf']);
      this.turnoService.setShowBtnComenzarLLamadas(true);
      
    }
    
  }


  
  actualizarEstadoTurno(idTurno: number, estadoNuevo: eEstadoTurno) : void {   
    this.apiService.actualizarEstadoDelTurno(idTurno,estadoNuevo).subscribe({
      next: (response) =>{
        if(!response.success){
          this.toastr.error('No se pudo actualizar el estado ','Error' );
        }
          this.toastr.success("El turno ha sido cancelado")
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error alactualizar estado del turno', error);
      },
      complete: () => {
      }
    });
  }

}
