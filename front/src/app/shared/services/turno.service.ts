import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TurnoDTO } from '../../core/dtos/turno.dto';
import { TurnoListaDeEspera } from '../../core/dtos/turno-lista-espera.dto';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor() { }


  //Generic turnosList -> Almacenar turnos que vienen de la base
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




  //turnos filtrados segun Profesional, tipoCircuito, enCurso, y fecha de hoy
  private turnosEncontradosElUserLogueado = new BehaviorSubject<TurnoDTO[]>([]);
  turnosEncontradosElUserLogueado$ = this.turnosEncontradosElUserLogueado.asObservable();

  getTurnosEncontradosParaElUserLogueado(): TurnoDTO[] {
    return this.turnosEncontradosElUserLogueado.value;
  }

  setTurnosEncontradosElUserLogueado(turnos: TurnoDTO[]): void {
    this.turnosEncontradosElUserLogueado.next(turnos);
  }






  //Cuando  se presenta en la Clinica
  private turnoAFacturar = new BehaviorSubject<TurnoDTO>(new TurnoDTO);
  turnoAFacturar$ = this.turnoAFacturar.asObservable();

  getTurnoAFacturar(): TurnoDTO {
    return this.turnoAFacturar.value;
  }

  setTurnoAFacturar(turno: TurnoDTO): void {
    this.turnoAFacturar.next(turno);
  }



  

//Turnos que se ven en la lista de espera
  private turnosEnListaDeEspera = new BehaviorSubject<TurnoListaDeEspera[]>([]);
  turnosEnListaDeEspera$ = this.turnosEnListaDeEspera.asObservable();

  getTurnosEnListaDeEspera(): TurnoListaDeEspera[] {
    return this.turnosEnListaDeEspera.value;
  }

  setTurnosEnListaDeEspera(turnoListaEsperaCustom: TurnoListaDeEspera[]): void {
    this.turnosEnListaDeEspera.next(turnoListaEsperaCustom);
  }
  addTurnoEnListaDeEspera(turno: TurnoListaDeEspera): void {
    const currentTurnosEnListaEspera = this.getTurnosEnListaDeEspera();
    this.turnosEnListaDeEspera.next([...currentTurnosEnListaEspera, turno]);
  }
  removeTurnosEnListaDeEspera(idTurno: number): void {
    const currentTurnos = this.getTurnosEnListaDeEspera();
    this.turnosEnListaDeEspera.next(currentTurnos.filter(turno => turno.idTurno !== idTurno));
  console.log("deleted: ", currentTurnos);
  
  }



//booleano para mostrar u ocultar boton para llamar Pacientes
private showBtnComenzarLLamadas = new BehaviorSubject<boolean>(true);
showBtnComenzarLLamadas$ = this.showBtnComenzarLLamadas.asObservable();

getShowBtnComenzarLLamadas(): boolean {
  return this.showBtnComenzarLLamadas.value;
}

setShowBtnComenzarLLamadas(showBtnComenzarLLamadas: boolean): void {
  this.showBtnComenzarLLamadas.next(showBtnComenzarLLamadas);
}








}
