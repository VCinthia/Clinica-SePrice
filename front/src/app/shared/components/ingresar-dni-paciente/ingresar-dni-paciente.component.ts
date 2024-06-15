import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { PersonaDTO } from '../../../core/dtos/persona.dto';
import { TurnosService } from '../../../services/turnos.service';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { CommonModule } from '@angular/common';
import { PacienteDTO } from '../../../core/dtos/paciente.dto';

@Component({
  selector: 'app-ingresar-dni-paciente',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './ingresar-dni-paciente.component.html',
  styleUrl: './ingresar-dni-paciente.component.scss'
})
export class IngresarDniPacienteComponent implements OnInit{
  persona: PersonaDTO = new PersonaDTO();
  paciente: PacienteDTO = new PacienteDTO();
  turnoSeleccionado: TurnoDTO | null = null;
  estudioSeleccionado : string | undefined = '';

  dniFormControl = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private apiService: ApiService,
    private turnosService: TurnosService
  ) {}

  //datos: any;//ver de sacar

  ngOnInit(): void {
    if (this.router.url === '/consultoriosExternos/ingresarPaciente') {
      this.turnosService.turnoSeleccionado$.subscribe(turno => {
        this.turnoSeleccionado = turno;
        console.log('Turno Seleccionado 2 = ', this.turnoSeleccionado);        
      });
    }

    if (this.router.url === '/estudiosClinicos/ingresarPaciente') {
      this.turnosService.estudioSeleccionado$.subscribe(estudio => {
        this.estudioSeleccionado = estudio.name;
      });
    }
  }

  getPersonByDniYNavegar(dni: string): void {
    let dniParseado = parseInt(dni);
    this.apiService.getPaciente(dniParseado).subscribe(
      (response) => {
        this.paciente = response;
        this.turnosService.actualizarPacienteSeleccionado(this.paciente);
        console.log(this.paciente);
        if (this.turnoSeleccionado) {
          console.log('prueba de turno selecc', this.turnoSeleccionado);          
          if (this.router.url === '/consultoriosExternos/ingresarPaciente') {
            this.router.navigate(['consultoriosExternos/ingresarPaciente/confirmarPaciente']);
          } else if (this.router.url === '/estudiosClinicos/ingresarPaciente') {
            this.router.navigate(['estudiosClinicos/ingresarPaciente/confirmarPaciente']);
          }
        }
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
  
  volver(){
    if (this.router.url === '/consultoriosExternos/ingresarPaciente') {
      this.router.navigate(['consultoriosExternos/seleccionarTurno']);
    }
    if (this.router.url === '/estudiosClinicos/ingresarPaciente' && (this.estudioSeleccionado === 'Laboratorio' || this.estudioSeleccionado === 'Guardia')) {
      this.router.navigate(['estudiosClinicos/nuevoTurno']);
    } else if (this.router.url === '/estudiosClinicos/ingresarPaciente'){
      this.router.navigate(['estudiosClinicos/seleccionarTurno']);  
    }    
  }
}

