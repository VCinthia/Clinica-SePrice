import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-llamado-paciente-1',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './llamado-paciente-1.component.html',
  styleUrl: './llamado-paciente-1.component.scss'
})
export class LlamadoPaciente1Component {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ){

  }

  irASegundoLlamado(){
    if (this.router.url === '/estudiosClinicos/listaEsperaProf/llamarPaciente') {
      this.toastr.success('Primer llamado a paciente realizado');
      this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente2']);
    } 
    if (this.router.url === '/consultoriosExternos/listaEsperaProf/llamarPaciente') {
      this.toastr.success('Primer llamado a paciente realizado');
      this.router.navigate(['consultoriosExternos/listaEsperaProf/llamarPaciente2']);
    }
  }
}
