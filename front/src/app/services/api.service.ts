import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TurnoDTO } from '../core/dtos/turno.dto';
import { UsuarioDTO } from '../core/dtos/usuario.dto';
import { PersonaDTO } from '../core/dtos/persona.dto';
import { ProfesionalDTO } from '../core/dtos/profesional.dto';
import { InsumoDTO } from '../core/dtos/insumo.dto';
import { eEspecialidad } from '../core/enums/especialidad.enum';
import { eTipoTurno } from '../core/enums/tipo-turno.enum';
import { eEstadoTurno } from '../core/enums/estado-turno.enum';
import { ResponseDTO } from '../core/dtos/response.dto';
import { HistoriaClinicaDTO } from '../core/dtos/historia-clinica.dto';

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

  getTurnosByTipoAndProfesionalAndDayAndEstado(tipo: eTipoTurno,  profesionalId: number, diaTurno:Date, estado:eEstadoTurno): Observable<TurnoDTO[]> {
    const url = `${this.BASE_URL}/turno/tipo-profesional`;
    const fechaTurnoISO = diaTurno.toDateString();  //solo envio el dia, no hora
    console.log("fechaHoy", fechaTurnoISO);
    
    return this.httpClient.get<TurnoDTO[]>(url, {
      params: {
        tipo,
        profesionalId,
        fechaTurnoISO,
        estado
      }
    });
  }


  getTurnosByTipoAndDayAndEstado(tipo: eTipoTurno, estado:eEstadoTurno,diaTurno:Date): Observable<TurnoDTO[]> {
    const url = `${this.BASE_URL}/turno/tipo`;
    const fechaTurnoISO = diaTurno.toDateString();  //solo envio el dia, no hora
    console.log("fechaHoy***", fechaTurnoISO);
    return this.httpClient.get<TurnoDTO[]>(url, {
      params: {
        tipo,
        fechaTurnoISO,
        estado
      }
    });
  }



  //para postea  nuevo turno, no pasar el id, se genera automaticamente en la base
  postNewTurno(turnoDTO: TurnoDTO): Observable<TurnoDTO> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.BASE_URL, turnoDTO, { headers: headers });
  }


  actualizarEstadoDelTurno(id: number, estado: eEstadoTurno): Observable<ResponseDTO<TurnoDTO>> {
    const body = { id, estado };
    const url = `${this.BASE_URL}/turno/estado`;
    return this.httpClient.patch<ResponseDTO<TurnoDTO>>(url, body);
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
    const url = `${this.BASE_URL}/persona/dni/${dni}`;
    return this.httpClient.get<PersonaDTO>(url);
  }



   //PROFESIONAL
   getProfesionalByDni(dni: number): Observable<ProfesionalDTO> {
    const url = `${this.BASE_URL}/profesional/dni/${dni}`;
    return this.httpClient.get<ProfesionalDTO>(url);
   }

  // getProfesionalByEspecialidad(especialidad : eEspecialidad): Observable<ProfesionalDTO[]> {
  //   // const url = `${this.BASE_URL}/profesional/especialidad?especialidad=${especialidad}`;///profesional/especialidad?especialidad=SALUD_MENTAL
  //   const url = `${this.BASE_URL}/profesional/especialidad`;
  //   return this.httpClient.get<ProfesionalDTO[]>(url, {
  //     params: {
  //       especialidad
  //     }
  //   });
  // }

  getProfesionalByEspecialidad(especialidad: string): Observable<ProfesionalDTO[]> {
    const url = `${this.BASE_URL}/profesional/especialidad`;
    return this.httpClient.get<any>(url, {
      params: {
        especialidad
      }
    }).pipe(
      map(response => response.data), // Acceder a la propiedad data del objeto de respuesta
    );
  }

  //INSUMOS
  getAllInsumos(): Observable<InsumoDTO[]> {
    const url = `${this.BASE_URL}/insumo/all`;
    return this.httpClient.get<InsumoDTO[]>(url);
  }




  //HISTORIA-CLINICA
  getHistoriaClinicaByDni(dniPaciente: number): Observable<ResponseDTO<HistoriaClinicaDTO>> {
    const url = `${this.BASE_URL}/historiaclinica/dni/${dniPaciente}`;
    return this.httpClient.get<ResponseDTO<HistoriaClinicaDTO>>(url);
   }


   actualizarHistoriaClinica(historiaClinicaUpdated: HistoriaClinicaDTO, usuarioEditorUserName: string ): Observable<ResponseDTO<null>> {
    const body = { historiaClinicaUpdated, usuarioEditorUserName };
    const url = `${this.BASE_URL}/historiaclinica/edit`;
    return this.httpClient.put<ResponseDTO<null>>(url, body);
  }




}
