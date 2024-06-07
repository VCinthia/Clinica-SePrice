import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGuardarHistoriaComponent } from '../dialog-guardar-historia/dialog-guardar-historia.component';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.scss'
})
export class HistoriaClinicaComponent {
  constructor(public dialog: MatDialog) {}

  notificacionConfirmar(): void {
    const dialogRef = this.dialog.open(DialogGuardarHistoriaComponent, {
      width: '600px',
      height: '250px'
    });

  }
}
