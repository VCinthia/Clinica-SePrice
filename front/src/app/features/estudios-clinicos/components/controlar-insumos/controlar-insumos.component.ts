import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogInformeInsumosComponent } from '../dialog-informe-insumos/dialog-informe-insumos.component';
import { ApiService } from '../../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { InsumoDTO } from '../../../../core/dtos/insumo.dto';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { BtnInactiveComponent } from '../../../../shared/components/btn-inactive/btn-inactive.component';

@Component({
  selector: 'app-controlar-insumos',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnInactiveComponent, MatTableModule, FormsModule],
  templateUrl: './controlar-insumos.component.html',
  styleUrl: './controlar-insumos.component.scss'
})
export class ControlarInsumosComponent {
  
  listaInsumos: InsumoDTO[] = [];
  displayedColumns = ['insumoId', 'descripcion', 'cantidadDisponible'];
  
  constructor(
    public dialog: MatDialog,
    private apiService : ApiService,
    private toastr: ToastrService
  ){

  }

  solicitarInsumos(){
    const dialogRef = this.dialog.open(DialogInformeInsumosComponent, {
      width: '400px',
      height: '250px'
    });
  }

  ngOnInit(): void {
    this.getAllInsumos();
  }

  getAllInsumos():void{
    this.apiService.getAllInsumos().subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No existen insumos','Error' );
        }
        this.listaInsumos = response;
        console.log(this.listaInsumos);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
   }

   isCantidadCero(row: any, column: string): boolean {
    return row[column] === 0;
  }

  hayAlgunaCantidadCero = (arr: any[], column: string): boolean => {
    return arr.some(row => row[column] === 0);
  };
}
