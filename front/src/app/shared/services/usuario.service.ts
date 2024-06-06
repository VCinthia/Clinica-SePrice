import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../../core/dtos/usuario.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }


  private usuarioLogeadoSubject = new BehaviorSubject<UsuarioDTO | null>(null);
  
  usuarioLogeado$ = this.usuarioLogeadoSubject.asObservable();

  setUsuarioLogeado(usuario: UsuarioDTO) {
    this.usuarioLogeadoSubject.next(usuario);
  }

  getUsuarioLogeado(): UsuarioDTO | null {
    return this.usuarioLogeadoSubject.value;
  }
}
