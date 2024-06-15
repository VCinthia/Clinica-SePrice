import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../../shared/components/btn-secondary/btn-secondary.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BtnInactiveComponent } from '../../../../shared/components/btn-inactive/btn-inactive.component';
import { TurnosService } from '../../../../services/turnos.service';
import { Router } from '@angular/router';

interface Estudio {
  name: string;
}

@Component({
  selector: 'app-seleccionar-estudio',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent, BtnInactiveComponent, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './seleccionar-estudio.component.html',
  styleUrl: './seleccionar-estudio.component.scss',
})
export class SeleccionarEstudioComponent {

  estudioControl = new FormControl<Estudio | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  estudios: Estudio[] = [
    {name: 'Resonancia Magnética'},
    {name: 'Rayos X - Tórax'},
    {name: 'Laboratorio'},
    {name: 'Guardia'},
  ];
  estudioSeleccionado : string | undefined = '';


  constructor(private router: Router, 
    private turnosService: TurnosService
  ) {
  }

  ngOnInit(): void {
    this.estudioControl.valueChanges.subscribe(value => {
      this.turnosService.actualizarEstudioSeleccionado(value);
      this.estudioSeleccionado = value?.name;
    });
    
  }

  navegarAOpcionSeleccionada(){
    if (this.estudioSeleccionado === 'Guardia' || this.estudioSeleccionado === 'Laboratorio') {
      this.router.navigate(['estudiosClinicos/ingresarPaciente'])
    } else {
      this.router.navigate(['estudiosClinicos/seleccionarTurno'])
    }
  }

  volver(){
    if (this.router.url === '/estudiosClinicos/nuevoTurno') {
      this.router.navigate(['estudiosClinicos/gestionarTurnos']);
    }
  }

}
