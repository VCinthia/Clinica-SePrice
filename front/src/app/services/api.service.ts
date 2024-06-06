import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnoDTO } from '../core/dtos/turno.dto';
import { UsuarioDTO } from '../core/dtos/usuario.dto';
import { PersonaDTO } from '../core/dtos/persona.dto';
import { ProfesionalDTO } from '../core/dtos/profesional.dto';
import { InsumoDTO } from '../core/dtos/insumo.dto';
import { eEspecialidad } from '../core/enums/especialidad.enum';
import { eTipoTurno } from '../core/enums/tipo-turno.enum';

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
    const url = `${this.BASE_URL}/turno/all`;
    return this.httpClient.get<TurnoDTO[]>(url);
  }

  getTurnosByEspecialidadAndProfesional(tipo: eTipoTurno, especialidad: eEspecialidad, profesionalId: number): Observable<TurnoDTO[]> {
    const url = `${this.BASE_URL}/turno/especialidad-profesional`;
    return this.httpClient.get<TurnoDTO[]>(url, {
      params: {
        tipo,
        especialidad,
        profesionalId
      }
    });
  }

  //para postea  nuevo turno, no pasar el id, se genera automaticamente en la base
  postNewTurno(turnoDTO: TurnoDTO): Observable<TurnoDTO> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.BASE_URL, turnoDTO, { headers: headers });
  }



  //USUARIOS
  getUsuarioByUser(username: string): Observable<UsuarioDTO[]> {
    const url = `${this.BASE_URL}/usuario/username`;
    return this.httpClient.get<UsuarioDTO[]>(url, {
      params: {
        username
      }
    });
  }

  
  getUsuarioByPass(username: string, pass: string): Observable<UsuarioDTO> {
    const url = `${this.BASE_URL}/usuario/userpass`;
    return this.httpClient.get<UsuarioDTO>(url, {
      params: {
        username,
        pass,
      }
    });
  }


  //PERSONA
  getPersona(dni: number): Observable<PersonaDTO> {
    const url = `${this.BASE_URL}/persona/${dni}`;
    return this.httpClient.get<PersonaDTO>(url);
  }



   //PROFESIONAL
   getProfesional(dni: number): Observable<ProfesionalDTO> {
    const url = `${this.BASE_URL}/profesional/${dni}`;
    return this.httpClient.get<ProfesionalDTO>(url);
  }



  
  //INSUMOS
  getAllInsumos(): Observable<InsumoDTO[]> {
    const url = `${this.BASE_URL}/insumo/all`;
    return this.httpClient.get<InsumoDTO[]>(url);
  }
}
