import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TurnoDTO } from '../../core/dtos/turno.dto';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor() { }

  private turnosDB = new BehaviorSubject<TurnoDTO[]>([]);
  turnos$ = this.turnosDB.asObservable();

  getTurnos(): TurnoDTO[] {
    return this.turnosDB.value;
  }

  setTurnos(turnos: TurnoDTO[]): void {
    this.turnosDB.next(turnos);
  }

  addTurno(turno: TurnoDTO): void {
    const currentTurnos = this.getTurnos();
    this.turnosDB.next([...currentTurnos, turno]);
  }

  removeTurno(id: number): void {
    const currentTurnos = this.getTurnos();
    this.turnosDB.next(currentTurnos.filter(turno => turno.turnoId !== id));
  }



  private turnosEncontradosByDNI = new BehaviorSubject<TurnoDTO[]>([]);
  turnosEncontradosByDNI$ = this.turnosEncontradosByDNI.asObservable();

  getTurnosEncontradosByDNI(): TurnoDTO[] {
    return this.turnosEncontradosByDNI.value;
  }

  setTurnosEncontradosByDNI(turnos: TurnoDTO[]): void {
    this.turnosEncontradosByDNI.next(turnos);
  }


  private turnosAFacturar = new BehaviorSubject<TurnoDTO>(new TurnoDTO);
  turnosAFacturar$ = this.turnosAFacturar.asObservable();

  getturnosAFacturar(): TurnoDTO {
    return this.turnosAFacturar.value;
  }

  setturnosAFacturar(turno: TurnoDTO): void {
    this.turnosAFacturar.next(turno);
  }

}
