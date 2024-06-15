import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoriaClinicaDTO } from '../../core/dtos/historia-clinica.dto';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor() { }


  
//HistoriaClinicaSelectedDB
private historiaClinicaDBEdit = new BehaviorSubject<HistoriaClinicaDTO>(new HistoriaClinicaDTO);
historiaClinicaDBEdit$ = this.historiaClinicaDBEdit.asObservable();

getHistoriaClinicaDBEdit(): HistoriaClinicaDTO {
  return this.historiaClinicaDBEdit.value;
}

setHistoriaClinicaDBEdit(historiaClinicaDBEdit: HistoriaClinicaDTO): void {
  this.historiaClinicaDBEdit.next(historiaClinicaDBEdit);
}


}


