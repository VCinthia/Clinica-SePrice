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
  profesional: ProfesionalDTO | undefined;


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

  // // //MEDICINA_GENERAL, PEDIATRIA O ODONTOLOGIA
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
    private apiService: ApiService) { }


  private practicaSeleccionadaSource = new BehaviorSubject<any>(null);
  practicaSeleccionada$ = this.practicaSeleccionadaSource.asObservable();


  actualizarPracticaSeleccionada(practica: any): void {
    this.practicaSeleccionadaSource.next(practica);
    console.log('practica: ', practica);
    
  }

  private estudioSeleccionadoSource = new BehaviorSubject<any>(null);
  estudioSeleccionado$ = this.estudioSeleccionadoSource.asObservable();

  actualizarEstudioSeleccionado(practica: any): void {
    this.estudioSeleccionadoSource.next(practica);
  }

  async actualizarProfesionalSegunEspecialidad(practica: eEspecialidad): Promise<ProfesionalDTO | undefined> {
    try {
      const profesionales = await this.apiService.getProfesionalByEspecialidad(practica).toPromise();
      if (profesionales && profesionales.length > 0) {
        this.profesional = profesionales[0];
        console.log('Profesional actualizado: ', this.profesional);
        return this.profesional;
      } else {
        console.error('No se encontraron profesionales para la especialidad seleccionada');
        return undefined;
      }
    } catch (error) {
      console.error('Error al obtener profesionales', error);
      return undefined;
    }
  }
  

  //traer segun especialidad turnos disponibles MIO:
  getListaTurnosDisponiblesByEnum(name: eEspecialidad) {
    if (name) {
      this.getTurnosByEspecialidad(name)
    } else {
      console.log('No se seleccionó una especialidad');

    }
  }

  // getListaTurnosEstudio (){
  //   return this.turnosEstudios
  // }
  

  async generarTurnos(fecha: Date, tiempoTurno: number, especialidad: eEspecialidad): Promise<TurnoDTO[]> {
    const profesionalDto = await this.actualizarProfesionalSegunEspecialidad(especialidad);
    console.log('este es profesionalDto: ', profesionalDto);

    const turnos: TurnoDTO[] = [];
    const inicioJornada = new Date(fecha.setHours(8, 0, 0));
    const finJornada = new Date(fecha.setHours(16, 0, 0));

    let currentTurno = new Date(inicioJornada);
    let lastSobreturno = new Date(inicioJornada);

    while (currentTurno < finJornada) {
      const turno = new TurnoDTO(
        eTipoTurno.CONSULTA,
        new Date(currentTurno),
        tiempoTurno,
        false,
        especialidad,
        eEstadoTurno.PENDIENTE,
        undefined,
        profesionalDto,
      );
      turnos.push(turno);

      if (currentTurno.getTime() - lastSobreturno.getTime() >= 60 * 60 * 1000) {
        const sobreturno = new TurnoDTO(
          eTipoTurno.CONSULTA,
          new Date(currentTurno),
          tiempoTurno,
          true,
          especialidad,
          eEstadoTurno.PENDIENTE,
          undefined,
         profesionalDto,
        );
        turnos.push(sobreturno);
        lastSobreturno = new Date(currentTurno);
      }

      currentTurno.setMinutes(currentTurno.getMinutes() + tiempoTurno);
    }

    return turnos;
  }

  async getTurnosByEspecialidad(especialidad: eEspecialidad): Promise<TurnoDTO[]> {
    const fechaActual = new Date();
    let tiempoTurno: number;

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

    return await this.generarTurnos(fechaActual, tiempoTurno, especialidad);
  }

}
