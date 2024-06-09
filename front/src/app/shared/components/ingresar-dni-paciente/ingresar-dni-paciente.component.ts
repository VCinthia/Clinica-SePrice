import { Component } from '@angular/core';
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

@Component({
  selector: 'app-ingresar-dni-paciente',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent, ReactiveFormsModule],
  templateUrl: './ingresar-dni-paciente.component.html',
  styleUrl: './ingresar-dni-paciente.component.scss'
})
export class IngresarDniPacienteComponent {
  persona: PersonaDTO = new PersonaDTO();
  estudioSeleccionado : string | undefined = '';

  constructor(private router: Router, private apiService: ApiService, private turnosService: TurnosService){

  }

  datos: any;

  dniFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);


  ngOnInit(): void {
    if (this.router.url === '/estudiosClinicos/ingresarPaciente') {
      this.turnosService.estudioSeleccionado$.subscribe(estudio => {
        this.estudioSeleccionado = estudio.name;
      });
    }
  }

  navegarAConfirmarPaciente(value : any){
    if (this.router.url === '/estudiosClinicos/ingresarPaciente') {
      this.router.navigate(['estudiosClinicos/ingresarPaciente/confirmarPaciente']);
    } 
    if (this.router.url === '/consultoriosExternos/ingresarPaciente') {
      this.router.navigate(['consultoriosExternos/ingresarPaciente/confirmarPaciente']);
    }
  }

  volver(){
    if (this.router.url === '/estudiosClinicos/ingresarPaciente' && (this.estudioSeleccionado === 'Laboratorio' || this.estudioSeleccionado === 'Guardia')) {
      this.router.navigate(['estudiosClinicos/nuevoTurno']);
    } else if (this.router.url === '/estudiosClinicos/ingresarPaciente'){
      this.router.navigate(['estudiosClinicos/seleccionarTurno']);  
    }
    if (this.router.url === '/consultoriosExternos/ingresarPaciente') {
      this.router.navigate(['consultoriosExternos/seleccionarTurno']);
    }
  }

  getPersonByDni(dni : string): void {
    let dniParseado = parseInt(dni);
    this.apiService.getPersona(dniParseado).subscribe(
      (response) => {
        this.datos = response;
        this.persona = response;
        console.log(this.datos);
        

      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
}

