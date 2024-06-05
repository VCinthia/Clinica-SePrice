import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogInformeInsumosComponent } from '../dialog-informe-insumos/dialog-informe-insumos.component';

@Component({
  selector: 'app-controlar-insumos',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './controlar-insumos.component.html',
  styleUrl: './controlar-insumos.component.scss'
})
export class ControlarInsumosComponent {
  constructor(public dialog: MatDialog){

  }

  verificarInsumos(){
    const dialogRef = this.dialog.open(DialogInformeInsumosComponent, {
      width: '400px',
      height: '250px'
    });
  }
}
