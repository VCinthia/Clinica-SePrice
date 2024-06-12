import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';
import { TurnoService } from '../../services/turno.service';
import { TurnoListaDeEspera } from '../../../core/dtos/turno-lista-espera.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-llamado-paciente-1',
  standalone: true,
  imports: [BtnPrimaryComponent, CommonModule],
  templateUrl: './llamado-paciente-1.component.html',
  styleUrl: './llamado-paciente-1.component.scss'
})
export class LlamadoPaciente1Component {
  turnosListEspera : TurnoListaDeEspera[] = [];
  turnoUno : TurnoListaDeEspera | undefined;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private turnoService: TurnoService,
  ){
  }


  ngOnInit(): void {
  //OBSERVABLES
  this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
    this.turnosListEspera = turnosEnListaDeEspera;
    this.turnoUno = turnosEnListaDeEspera[0];
  });




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
