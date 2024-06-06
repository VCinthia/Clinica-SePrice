import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCard} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { PersonaDTO } from '../../../core/dtos/persona.dto';
import { FormsModule } from '@angular/forms';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { Observable } from 'rxjs';
import { eTipoUsuario } from '../../../core/enums/tipo-usuario.enum';
import { eGrupo } from '../../../core/enums/grupo.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCard, BtnPrimaryComponent, BtnSecondaryComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  usuarioLogeado = new UsuarioDTO;
  username: string  = "" ;
  password: string  = "" ;
  
  constructor(
    private router: Router,    
    private apiService: ApiService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,

  ) {}


  ngOnInit() {
    //reseteo Login -> cerrar sesion
    this.usuarioService.setUsuarioLogeado(new UsuarioDTO);
  }



  navegarAInicio() {
    if(this.username && this.password){
      this.login(this.username, this.password);
    }else{
      this.toastr.warning('Debe ingresar Usuario y contraseña','Alerta' );
    }
    
}


login(username: string, pass: string){   
  this.apiService.getUsuarioByPass(username, pass).subscribe({
    next: (response) =>{     
      if(!response){
        this.toastr.error('Login incorrecto','Error' );
      }
      this.toastr.success('credenciales validadas','')

      //Actualizo el servicio con la informacion del login
      this.usuarioService.setUsuarioLogeado(response)
      this.usuarioLogeado = response;

      if(this.usuarioLogeado.grupo === eGrupo.CONSULTORIOS_EXTERNOS){
        this.router.navigate(['/consultoriosExternos']);
      }else if(this.usuarioLogeado.grupo === eGrupo.ESTUDIOS_CLINICOS){
        this.router.navigate(['/estudiosClinicos']);
      }else if(this.usuarioLogeado.grupo === eGrupo.ESTUDIOS_CONSULTORIOS){
        this.router.navigate(['/inicio']);
      }
      console.log('Login: ', this.usuarioLogeado);
    },
    error:(error: HttpErrorResponse) => {
      this.toastr.error(error.error?.message, 'Error' );
      console.error('Error fetching Login data:', error);

    },
    complete: () => {
    }
  });
}

clickEvent(event: MouseEvent) {
  this.hide = !this.hide;
  event.stopPropagation();
}

}