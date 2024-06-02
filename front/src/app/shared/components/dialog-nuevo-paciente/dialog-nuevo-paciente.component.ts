import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-nuevo-paciente',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatSelectModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent],
  templateUrl: './dialog-nuevo-paciente.component.html',
  styleUrl: './dialog-nuevo-paciente.component.scss'
})
export class DialogNuevoPacienteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNuevoPacienteComponent>,
    private router : Router,
    private toastr: ToastrService
  ) {}

  dni = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  tel = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  nombre = new FormControl('', [Validators.required]);
  apellido = new FormControl('', [Validators.required]);
  fechaNac = new FormControl('', [Validators.required]);
  grupoSanguineo = new FormControl('', Validators.required);
  obraSocial = new FormControl('', Validators.required);

  cerrarModal(){
    this.dialogRef.close();
  }

  agregarPaciente(){

    this.dialogRef.close();
    this.toastr.success('Paciente añadido correctamente!');
  }
}
