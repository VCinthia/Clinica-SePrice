import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-cerrar-sesion',
  standalone: true,
  imports: [BtnPrimaryComponent, 
    BtnSecondaryComponent,
    MatFormFieldModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './dialog-cerrar-sesion.component.html',
  styleUrl: './dialog-cerrar-sesion.component.scss'
})
export class DialogCerrarSesionComponent {

  constructor(private dialogRef: MatDialogRef<DialogCerrarSesionComponent>,
    private router : Router,
    private toastr : ToastrService,
  ) {}

  cancelar(): void{
    this.dialogRef.close();
  }

  cerrarSesion(): void {
    this.dialogRef.close();
    this.router.navigate(['']);
    this.toastr.success('Se ha cerrado sesión exitosamente!')
  }
}
