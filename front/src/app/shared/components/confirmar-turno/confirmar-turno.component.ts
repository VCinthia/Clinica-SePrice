import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogTurnoConfirmadoComponent } from '../dialog-turno-confirmado/dialog-turno-confirmado.component';

@Component({
  selector: 'app-confirmar-turno',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './confirmar-turno.component.html',
  styleUrl: './confirmar-turno.component.scss'
})
export class ConfirmarTurnoComponent {

  constructor(public dialog: MatDialog) {}

  notificacionConfirmar(): void {
    const dialogRef = this.dialog.open(DialogTurnoConfirmadoComponent, {
      width: '400px',
      height: '250px'
    });

  }
}
