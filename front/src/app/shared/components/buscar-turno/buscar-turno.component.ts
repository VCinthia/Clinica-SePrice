import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { TurnoService } from '../../services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { eTipoTurno } from '../../../core/enums/tipo-turno.enum';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-buscar-turno',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent, ReactiveFormsModule],
  templateUrl: './buscar-turno.component.html',
  styleUrl: './buscar-turno.component.scss'
})
export class BuscarTurnoComponent {
  dniFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  currentRoute: string | undefined;
  turnosList : TurnoDTO[]  = [];


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private turnoService: TurnoService,
    private apiService: ApiService,
  ){

  }




  ngOnInit(): void {
    this.currentRoute = this.router.url;
    //OBSERVABLES
    this.turnoService.turnos$.subscribe((turnosAcreditar) => {
    this.turnosList = turnosAcreditar;
  });



  this.getTurnosAcreditarAndSetInServiceTurnos();
  }

  



  navegarAConfirmarPaciente(value : any){   
    console.log("value: ", value);
    const turnosFiltradosEnCursoByDni =  this.turnosList.filter(turno => turno.paciente?.dniPaciente == value);
    this.turnoService.setTurnosEncontradosElUserLogueado(turnosFiltradosEnCursoByDni);
    console.log("turnosListBuscarTurnoByDNI: ", turnosFiltradosEnCursoByDni);
    if(turnosFiltradosEnCursoByDni.length > 0){
      if (this.router.url === '/estudiosClinicos/acreditarTurno') {
        this.router.navigate(['estudiosClinicos/acreditarTurno/confirmarTurno']);
      } 
      if (this.router.url === '/consultoriosExternos/acreditarTurno') {
        this.router.navigate(['consultoriosExternos/acreditarTurno/confirmarTurno']);
      }

    }else{
      this.toastr.warning('No se han encontrado turnos' );
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




getTurnosAcreditarAndSetInServiceTurnos(){
        //busqueda de turnos:
        if (this.currentRoute?.includes('estudiosClinicos')) {
          this.getTurnosByTipoPendientesHoy(eTipoTurno.ESTUDIO);
        } else if (this.currentRoute?.includes('consultoriosExternos')) {
          this.getTurnosByTipoPendientesHoy(eTipoTurno.CONSULTA);
        }
}





getTurnosByTipoPendientesHoy(tipo:eTipoTurno): void {
  this.apiService.getTurnosByTipoAndDayAndEstado(tipo, eEstadoTurno.PENDIENTE, new Date()).subscribe({
    next: (response) => {
      if (!response) {
        this.toastr.error('No se ha podido obtener turnos pendientes', 'Error');
        return;
      }

      if (response.length) {
        let turnosPendientes = response;
        //Ordenar Turnos
        turnosPendientes.sort((a, b) => {
          const fechaA = new Date(a.inicioFechaHora!).getTime();
          const fechaB = new Date(b.inicioFechaHora!).getTime();
          return fechaA - fechaB; // Orden ascendente
        });
        this.toastr.success('Hay ' + turnosPendientes.length + ' turnos para acreditar hoy');
        //Actualizo el servicio "TURNOS" con los turnos pendientes de la Base 
        this.turnoService.setTurnos(turnosPendientes);
        console.log('TurnosPendientes: ', turnosPendientes);
      } else {
        this.toastr.warning('No hay turnos para acreditar hoy');
      }
    },
    error: (error) => {
      this.toastr.warning(error.error?.message);
      console.error('Error al obtener turnos Pendientes para hoy', error);
    },
  });
}



}
