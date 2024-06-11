import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../../shared/components/btn-secondary/btn-secondary.component';
import { BtnInactiveComponent } from '../../../../shared/components/btn-inactive/btn-inactive.component';
import { Router } from '@angular/router';
import { TurnosService } from '../../../../services/turnos.service';
import { eEspecialidad } from '../../../../core/enums/especialidad.enum';

interface Practica {
  name: string;
  tiempoTurno: number
}

@Component({
  selector: 'app-seleccionar-practica',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent, BtnInactiveComponent, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './seleccionar-practica.component.html',
  styleUrl: './seleccionar-practica.component.scss'
})
export class SeleccionarPracticaComponent implements OnInit {

  practicaControl = new FormControl<Practica | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  turnos: any[] = [];

  practicasEnum: Practica[] = [
    { name: eEspecialidad.FISIO_KINESIOLOGIA, tiempoTurno: 25 },
    { name: eEspecialidad.SALUD_MENTAL, tiempoTurno: 30 },
    { name: eEspecialidad.MEDICINA_GENERAL, tiempoTurno: 15 },
    { name: eEspecialidad.PEDIATRIA, tiempoTurno: 15 },
    { name: eEspecialidad.ODONTOLOGIA, tiempoTurno: 15 },
  ];

  constructor(private router: Router,
    private turnosService: TurnosService
  ) {
  }

  ngOnInit(): void {
    this.practicaControl.valueChanges.subscribe(value => {
      this.turnosService.actualizarPracticaSeleccionada(value);
    });
  }

  navegarASeleccionarTurno() {
    if (this.router.url === '/consultoriosExternos/nuevoTurno') {
      this.router.navigate(['consultoriosExternos/seleccionarTurno']);
    }
  }

  volver(){
    if (this.router.url === '/consultoriosExternos/nuevoTurno') {
      this.router.navigate(['consultoriosExternos/gestionarTurnos']);
    }
  }
}
