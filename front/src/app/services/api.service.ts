import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnoDTO } from '../core/dtos/turno.dto';

@Injectable({
   //habilita la injeccion de dependencia del servicio
  providedIn: 'root'
})
export class ApiService {
  readonly BASE_URL:string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  
  getTurnos(): Observable<TurnoDTO[]> {
    return this.httpClient.get<TurnoDTO[]>('/turno');
  }

  getPersona(dni: number): Observable<any> {
    const url = `${this.BASE_URL}/persona/${dni}`;
    return this.httpClient.get<any>(url);
  }
}
