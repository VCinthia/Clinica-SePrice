import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogNuevoPacienteComponent } from '../dialog-nuevo-paciente/dialog-nuevo-paciente.component';

@Component({
  selector: 'app-card-nuevo-paciente',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './card-nuevo-paciente.component.html',
  styleUrl: './card-nuevo-paciente.component.scss'
})
export class CardNuevoPacienteComponent {

  constructor(public dialog: MatDialog) {}

  abrirModalNuevoPaciente(): void {
    const dialogRef = this.dialog.open(DialogNuevoPacienteComponent, {
      width:'520px',
      height:'520px'
    });

  }
}
