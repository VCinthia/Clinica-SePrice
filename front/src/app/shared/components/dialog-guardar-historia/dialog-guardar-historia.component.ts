import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-guardar-historia',
  standalone: true,
  imports: [BtnPrimaryComponent, 
    BtnSecondaryComponent,
    MatFormFieldModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './dialog-guardar-historia.component.html',
  styleUrl: './dialog-guardar-historia.component.scss'
})
export class DialogGuardarHistoriaComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogGuardarHistoriaComponent>,
    private router : Router
  ) {}
  
  volverAListaEspera(){
    if (this.router.url === '/estudiosClinicos/historiaClinica') {
      this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente']);
      this.dialogRef.close()
    }
    if (this.router.url === '/consultoriosExternos/historiaClinica') {
      this.router.navigate(['consultoriosExternos/listaEsperaProf/llamarPaciente']);
      this.dialogRef.close()
    }
  }
  
  cancelar(){
    this.dialogRef.close();
  }
}
