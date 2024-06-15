import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../../shared/components/btn-secondary/btn-secondary.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-informe-insumos',
  standalone: true,
  imports: [BtnPrimaryComponent, 
    BtnSecondaryComponent,
    MatFormFieldModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './dialog-informe-insumos.component.html',
  styleUrl: './dialog-informe-insumos.component.scss'
})
export class DialogInformeInsumosComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogInformeInsumosComponent>,
    private router : Router,
    private toastr: ToastrService
  ) {}

  emitirReporte(){
    this.dialogRef.close();
    this.router.navigate(['estudiosClinicos']);
    this.toastr.success('Reporte emitido!');

  }
}
