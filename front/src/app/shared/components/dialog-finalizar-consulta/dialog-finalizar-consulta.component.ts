import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-finalizar-consulta',
  standalone: true,
  imports: [],
  templateUrl: './dialog-finalizar-consulta.component.html',
  styleUrl: './dialog-finalizar-consulta.component.scss'
})
export class DialogFinalizarConsultaComponent {

  constructor(private dialogRef: MatDialogRef<DialogFinalizarConsultaComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
