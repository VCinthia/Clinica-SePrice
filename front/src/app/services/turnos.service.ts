import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { eEspecialidad } from '../core/enums/especialidad.enum';
import { TurnoDTO } from '../core/dtos/turno.dto';
import { ProfesionalDTO } from '../core/dtos/profesional.dto';
import { eTipoTurno } from '../core/enums/tipo-turno.enum';
import { eEstadoTurno } from '../core/enums/estado-turno.enum';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { PacienteDTO } from '../core/dtos/paciente.dto';
import { eModalidadDePago } from '../core/enums/modalidad-de-pago.enum';

@Injectable({
  providedIn: 'root'
})

export class TurnosService {
  profesional: ProfesionalDTO | undefined;
  paciente: PacienteDTO | undefined;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  //PRACTICA SELECCIONADA LA USE PARA IDENTIFICAR ESPECIALIDAD
  private practicaSeleccionadaSource = new BehaviorSubject<any>(null);
  practicaSeleccionada$ = this.practicaSeleccionadaSource.asObservable();

  actualizarPracticaSeleccionada(practica: any): void {
    this.practicaSeleccionadaSource.next(practica);
    console.log('practica: ', practica);
  }

  //VER DE USAR LA DE PRACTICA PARA AMBOS CIRCUITOS
  private estudioSeleccionadoSource = new BehaviorSubject<any>(null);
  estudioSeleccionado$ = this.estudioSeleccionadoSource.asObservable();

  actualizarEstudioSeleccionado(practica: any): void {
    this.estudioSeleccionadoSource.next(practica);
  }

  //OBSERVABLE DE TURNO SIN PACIENTE ASIGNADO
  private turnoSeleccionadoSource = new BehaviorSubject<TurnoDTO | null>(null);
  turnoSeleccionado$ = this.turnoSeleccionadoSource.asObservable();

  actualizarTurnoSeleccionado(turno: TurnoDTO | null): void {
    this.turnoSeleccionadoSource.next(turno);
    console.log('Turno actualizado:', turno);
  }

  // OBSERVABLE PARA PACIENTE SELECCIONADO
  private pacienteSeleccionadoSource = new BehaviorSubject<PacienteDTO | null>(null);
  pacienteSeleccionado$ = this.pacienteSeleccionadoSource.asObservable();

  actualizarPacienteSeleccionado(paciente: PacienteDTO | null): void {
    this.pacienteSeleccionadoSource.next(paciente);
    console.log('Paciente actualizado:', paciente);
  }

  // Actualización de profesional según especialidad
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


  // Obtener lista de turnos disponibles por especialidad
  getListaTurnosDisponiblesByEnum(name: eEspecialidad) {
    if (name) {
      this.getTurnosByEspecialidad(name)
    } else {
      console.log('No se seleccionó una especialidad');

    }
  }

  // Generar lista de turnos sin paciente asociado
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
        eModalidadDePago.PARTICULAR,
        undefined,//paciente
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
          eModalidadDePago.PARTICULAR,
          undefined,//paciente
          profesionalDto,
        );
        turnos.push(sobreturno);
        lastSobreturno = new Date(currentTurno);
      }
      currentTurno.setMinutes(currentTurno.getMinutes() + tiempoTurno);
    }
    return turnos;
  }

  //Genera la lista segun tiempo de turno x especialidad
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

  async crearTurnoEnBDD(turno : TurnoDTO, paciente : PacienteDTO): Promise<void>{
    try{
      if(turno && paciente){
        turno.paciente = paciente;
        //console.log('PRUEBA DE AGREGAR INFO DEL PACIENTE AL TURNO', turno);
        const turnoCreado = await this.apiService.postNewTurno(turno).toPromise();
      console.log('Turno creado en la BDD: ', turnoCreado);        
      }
    } catch (error) {
      console.error('Error al crear turno', error);
      return undefined;
    }
  }

}
