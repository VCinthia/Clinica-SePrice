import { Component, OnInit } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { TurnosService } from '../../../services/turnos.service';
import { ApiService } from '../../../services/api.service';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { eEspecialidad } from '../../../core/enums/especialidad.enum';
//importo para manejar horarios de get y lista y comparar
import moment from 'moment-timezone';

@Component({
  selector: 'app-seleccionar-turno',
  standalone: true,
  imports: [DatePipe, MatTableModule, BtnPrimaryComponent, BtnSecondaryComponent, BtnInactiveComponent, FormsModule, MatRadioModule, CommonModule],
  templateUrl: './seleccionar-turno.component.html',
  styleUrl: './seleccionar-turno.component.scss'
})
export class SeleccionarTurnoComponent implements OnInit{

  practicaSeleccionada: eEspecialidad | null = null;
  estudioSeleccionado: string | null = null;
  turnos: TurnoDTO[] = [];
  selectedOption: string | null = null;

  tiempoTurno: number = 0;
  turnosTomados: any[] = [];
  turnosOcupados: TurnoDTO[] = [];

  constructor(
    private router: Router,
    private turnosService: TurnosService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.selectedOption = ''
  };

  ngOnInit(): void {
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.turnosService.practicaSeleccionada$.subscribe(practica => {
        if (practica) {
          this.practicaSeleccionada = practica.name;
          this.tiempoTurno = practica.tiempoTurno;
          console.log('Practica', practica.name, 'Tiempo Turno', practica.tiempoTurno);
          this.fetchTurnosByEspecialidad(practica.name);
        }
      });
    }

    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.turnosService.estudioSeleccionado$.subscribe(estudio => {
        if (estudio) {
          this.estudioSeleccionado = estudio.name;
          this.fetchTurnosOcupados();
        }
      });
    }
  }

  fetchTurnosByEspecialidad(especialidad: eEspecialidad): void {
    this.turnosService.getTurnosByEspecialidad(especialidad).then(turnos => {
      this.turnos = turnos;
      console.log('Turnos:', this.turnos);
      this.fetchTurnosOcupados();
    }).catch(error => {
      console.error('Error fetching turnos by especialidad:', error);
      this.toastr.error('Error al obtener los turnos', 'Error');
    });
  }

  fetchTurnosOcupados(): void {
    this.apiService.getAllTurnos().subscribe({
      next: (response) => {
        if (!response) {
          this.toastr.error('No hay turnos registrados', 'Error');
        }
        this.toastr.success('Turnos encontrados de la especialidad indicada', '')
        this.turnosOcupados = response.filter(objeto => objeto.especialidad === this.practicaSeleccionada);
        console.log('Turnos Ocupados:', this.turnosOcupados);
      },
      error: (error) => {
        this.toastr.error(error?.message, 'Error');
        console.error('Error fetching turnos data:', error);
      }
    });
  }


  displayedColumns = ['fecha', 'horaInicio', 'profesional', 'select'];

  isTurnoOcupado(turno: TurnoDTO): boolean {
    const inicioNuevo = moment(turno.inicioFechaHora).tz('America/Argentina/Buenos_Aires');
    const finNuevo = moment(inicioNuevo).add(turno.duracionMinutos, 'minutes');

    return this.turnosOcupados.some(ocupado => {
      const inicioExistente = moment(ocupado.inicioFechaHora).tz('America/Argentina/Buenos_Aires');
      const finExistente = moment(inicioExistente).add(ocupado.duracionMinutos, 'minutes');
      return this.seSolapan(inicioNuevo, finNuevo, inicioExistente, finExistente);
    });
  }

  seSolapan(inicio1: moment.Moment, fin1: moment.Moment, inicio2: moment.Moment, fin2: moment.Moment): boolean {
    return inicio1.isBefore(fin2) && inicio2.isBefore(fin1);
  }

  navegarAIngresarPaciente() {
    const turnoSeleccionado = this.turnos.find(
      turno => turno.inicioFechaHora + '-' + turno.esSobreturno === this.selectedOption
    );
    console.log('TurnoSeleccionado', turnoSeleccionado);

    if (turnoSeleccionado && this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.turnosService.actualizarTurnoSeleccionado(turnoSeleccionado);
      this.router.navigate(['consultoriosExternos/ingresarPaciente']);
    }
    if (turnoSeleccionado && this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.turnosService.actualizarTurnoSeleccionado(turnoSeleccionado);
      this.router.navigate(['estudiosClinicos/ingresarPaciente']);
    }
  }

  volver() {
    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.router.navigate(['estudiosClinicos/nuevoTurno']);
    }
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.router.navigate(['consultoriosExternos/nuevoTurno']);
    }
  }
}
