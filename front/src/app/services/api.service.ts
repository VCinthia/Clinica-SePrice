import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnoDTO } from '../core/dtos/turno.dto';
import { UsuarioDTO } from '../core/dtos/usuario.dto';
import { PersonaDTO } from '../core/dtos/persona.dto';

@Injectable({
   //habilita la injeccion de dependencia del servicio
  providedIn: 'root'
})
export class ApiService {
  readonly BASE_URL:string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  //TURNOS
  getAllTurnos(): Observable<TurnoDTO[]> {
    return this.httpClient.get<TurnoDTO[]>('/turno/all');
  }


  //para postea  nuevo turno, no pasar el id, se genera automaticamente en la base
  postNewTurno(turnoDTO: TurnoDTO): Observable<TurnoDTO> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.BASE_URL, turnoDTO, { headers: headers });
  }


  
  //USUARIOS
  getUsuarioByUser(username: string): Observable<UsuarioDTO[]> {
    const url = `${this.BASE_URL}/usuario/${username}`;
    return this.httpClient.get<UsuarioDTO[]>(url);
  }


  //PERSONA
  getPersona(dni: number): Observable<PersonaDTO> {
    const url = `${this.BASE_URL}/persona/${dni}`;
    return this.httpClient.get<PersonaDTO>(url);
  }
}
