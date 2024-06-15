import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-turno-confirmado',
  standalone: true,
  imports: [MatFormFieldModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, BtnSecondaryComponent, BtnPrimaryComponent],
  templateUrl: './dialog-turno-confirmado.component.html',
  styleUrl: './dialog-turno-confirmado.component.scss'
})

export class DialogTurnoConfirmadoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTurnoConfirmadoComponent>,
    private router : Router,
    private toastr : ToastrService
  ) {}
  
  volverAlInicio(){
    if (this.router.url === '/consultoriosExternos/confirmarTurno') {
      this.router.navigate(['consultoriosExternos']);
      this.dialogRef.close()
    }
    if (this.router.url === '/estudiosClinicos/confirmarTurno') {
      this.router.navigate(['estudiosClinicos']);
      this.dialogRef.close()
    }
  }

  imprimirComprobante(){
    if (this.router.url === '/consultoriosExternos/confirmarTurno') {
      this.router.navigate(['consultoriosExternos']);
      this.dialogRef.close();
      this.toastr.success('Turno impreso correctamente');
    }
    if (this.router.url === '/estudiosClinicos/confirmarTurno') {
      this.router.navigate(['estudiosClinicos']);
      this.dialogRef.close();
      this.toastr.success('Turno impreso correctamente');
    }
  }
}
