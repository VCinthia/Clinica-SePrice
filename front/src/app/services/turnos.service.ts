import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  turnos15 : any[] = [
    {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '8:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '8:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '8:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '16:00', profesional:'Dr. González', sobreturno: true},
  ]

  turnos25 : any[] = [
    {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '8:25', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '8:50', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '9:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:40', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:05', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:55', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:20', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '11:20', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:45', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:10', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:35', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '12:35', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:25', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:50', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '14:15', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:40', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:05', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:55', profesional:'Dr. González', sobreturno: false},
  ]

  turnos30 : any[] = [
    {fecha: '22/06/2024', horaInicio: '8:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '8:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '9:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '9:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '10:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '10:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '11:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '11:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '12:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '12:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '13:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '13:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '14:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '14:30', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: true},
    {fecha: '22/06/2024', horaInicio: '15:00', profesional:'Dr. González', sobreturno: false},
    {fecha: '22/06/2024', horaInicio: '15:30', profesional:'Dr. González', sobreturno: false},
  ]

  constructor() { }

  private practicaSeleccionadaSource = new BehaviorSubject<any>(null);
  practicaSeleccionada$ = this.practicaSeleccionadaSource.asObservable();

  actualizarPracticaSeleccionada(practica: any): void {
    this.practicaSeleccionadaSource.next(practica);
  }


  getListaTurnos (tiempo: number){
    if (tiempo === 15) {
      return this.turnos15;
    } else if (tiempo === 25) {
      return this.turnos25;
    } else return this.turnos30;
  }
}
