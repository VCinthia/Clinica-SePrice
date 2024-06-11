import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { eEspecialidad } from '../core/enums/especialidad.enum';
import { TurnoDTO } from '../core/dtos/turno.dto';
import { ProfesionalDTO } from '../core/dtos/profesional.dto';
import { eTipoTurno } from '../core/enums/tipo-turno.enum';
import { eEstadoTurno } from '../core/enums/estado-turno.enum';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TurnosService {
  

  // turnosEstudios : any[] = [
  //   {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:45', profesional:'Dr. González', sobreturno: false},
  // ]

  // //MEDICINA_GENERAL, PEDIATRIA O ODONTOLOGIA
  // turnos15 : any[] = [
  //   {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '16:00', profesional:'Dr. González', sobreturno: true},
  // ]

  // //FISIO_KINESIOLOGIA
  // turnos25 : any[] = [
  //   {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:25', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:50', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:40', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:05', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:55', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:20', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '11:20', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:45', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:10', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:35', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '12:35', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:25', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:50', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:40', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:05', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:55', profesional:'Dr. González', sobreturno: false},
  // ]

  // //SALUD_MENTAL
  // turnos30 : any[] = [
  //   {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '8:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '9:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '11:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '12:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '13:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '14:30', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: true},
  //   {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: false},
  //   {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
  // ]

  constructor(
    private router: Router,
    private apiService: ApiService)
    { }


  private practicaSeleccionadaSource = new BehaviorSubject<any>(null);
  practicaSeleccionada$ = this.practicaSeleccionadaSource.asObservable();


  actualizarPracticaSeleccionada(practica: any): void {
    this.practicaSeleccionadaSource.next(practica);}


  private estudioSeleccionadoSource = new BehaviorSubject<any>(null);
  estudioSeleccionado$ = this.estudioSeleccionadoSource.asObservable();

  actualizarEstudioSeleccionado(practica: any): void {
    this.estudioSeleccionadoSource.next(practica);
  }


  // getListaTurnosConsultorio (tiempo: number){
  //   if (tiempo === 15) {
  //     return this.turnos15;
  //   } else if (tiempo === 25) {
  //     return this.turnos25;
  //   } else return this.turnos30;
  // }

  //traer segun especialidad turnos disponibles MIO:
  getListaTurnosDisponiblesByEnum(name : eEspecialidad){
    if (name) {
      this.getTurnosByEspecialidad(name)
    } else {
      console.log('No se seleccionó una especialidad');

    }
  }

  // getListaTurnosEstudio (){
  //   return this.turnosEstudios
  // }

  private generarTurnos(fecha: Date, tiempoTurno: number, especialidad: eEspecialidad): TurnoDTO[] { //, profesional: ProfesionalDTO
    const turnos: TurnoDTO[] = [];
    const inicioJornada = new Date(fecha.setHours(8, 0, 0)); // Inicio de la jornada a las 8:00
    const finJornada = new Date(fecha.setHours(16, 0, 0)); // Fin de la jornada a las 16:00

    let currentTurno = new Date(inicioJornada);

    while (currentTurno < finJornada) {
      const turno = new TurnoDTO(
        eTipoTurno.CONSULTA,
        new Date(currentTurno),
        tiempoTurno,
        false,
        especialidad,
        eEstadoTurno.PENDIENTE,
        undefined,
        //profesional
      );
      turnos.push(turno);
      currentTurno.setMinutes(currentTurno.getMinutes() + tiempoTurno);
    }
    return turnos;
  }

  getTurnosByEspecialidad(especialidad: eEspecialidad): TurnoDTO[] {//, profesional: ProfesionalDTO
    const fechaActual = new Date();
    let tiempoTurno: number;

    //!SEGUIR DESDE ACA CUANDO ESTE LA FUNCION DE BACK Y APISERVICE => const profesional: ProfesionalDTO = this.apiService.getProfesional(especialidad)

    switch (especialidad) {
      case eEspecialidad.FISIO_KINESIOLOGIA:
        tiempoTurno = 25;
        break;
      case eEspecialidad.SALUD_MENTAL:
        tiempoTurno = 30;
        break;
      case eEspecialidad.MEDICINA_GENERAL:
      case eEspecialidad.PEDIATRIA:
      case eEspecialidad.ODONTOLOGIA:
        tiempoTurno = 15;
        break;
      default:
        return [];
    }

    return this.generarTurnos(fechaActual, tiempoTurno, especialidad);//, profesional
  }


}
