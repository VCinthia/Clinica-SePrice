import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
usuarioLogeado: UsuarioDTO | null = null;

constructor(private usuarioService: UsuarioService) {}

ngOnInit() {

  //me suscribo al servicio para tomar el valor actualizado de usuario
  this.usuarioService.usuarioLogeado$.subscribe(usuario => {
    this.usuarioLogeado = usuario;
  });
}



}
