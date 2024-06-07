import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-llamado-paciente-2',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './llamado-paciente-2.component.html',
  styleUrl: './llamado-paciente-2.component.scss'
})
export class LlamadoPaciente2Component {
  
  segundoLlamadoRealizado : boolean = false;

  constructor(
    private router: Router,
    private toastr : ToastrService
  ){

  }

  confirmarAtencion(){
    if (this.router.url === '/estudiosClinicos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['estudiosClinicos/historiaClinica']);
    } 
    if (this.router.url === '/consultoriosExternos/listaEsperaProf/llamarPaciente2') {
      this.router.navigate(['consultoriosExternos/historiaClinica']);
    }
  }

  realizarSegundoLlamado(){
    this.segundoLlamadoRealizado = true;
    this.toastr.success('Segundo llamado a paciente realizado');
  }
}
