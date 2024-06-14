import { Component, OnInit } from '@angular/core';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { TurnosService } from '../../../services/turnos.service';
import { PersonaDTO } from '../../../core/dtos/persona.dto';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { CommonModule } from '@angular/common';
import { PacienteDTO } from '../../../core/dtos/paciente.dto';

@Component({
  selector: 'app-card-datos-paciente',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent,CommonModule],
  templateUrl: './card-datos-paciente.component.html',
  styleUrl: './card-datos-paciente.component.scss'
})
export class CardDatosPacienteComponent implements OnInit{
  paciente: PacienteDTO = new PacienteDTO();
  turnoSeleccionado: TurnoDTO | null = null;
  estudioSeleccionado : string | undefined = '';
  
  constructor(
    private router: Router,
    private apiService: ApiService,
    private turnosService: TurnosService
  ){ }

  ngOnInit(): void {
    this.turnosService.pacienteSeleccionado$.subscribe(paciente => {
      this.paciente = paciente || new PacienteDTO();
    });

    this.turnosService.turnoSeleccionado$.subscribe(turno => {
      this.turnoSeleccionado = turno;
    });
  }

  navegarAConfirmarTurno(){
    if (this.router.url === '/estudiosClinicos/ingresarPaciente/confirmarPaciente') {
      console.log('log: ', this.paciente, this.turnoSeleccionado);
      this.router.navigate(['estudiosClinicos/confirmarTurno']);
    }
    if (this.router.url === '/consultoriosExternos/ingresarPaciente/confirmarPaciente') {
      this.router.navigate(['consultoriosExternos/confirmarTurno']);
    }
  }
}
