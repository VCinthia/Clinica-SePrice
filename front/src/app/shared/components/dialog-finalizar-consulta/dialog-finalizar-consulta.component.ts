import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TurnoListaDeEspera } from '../../../core/dtos/turno-lista-espera.dto';
import { ApiService } from '../../../services/api.service';
import { TurnosService } from '../../../services/turnos.service';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-dialog-finalizar-consulta',
  standalone: true,
  imports: [BtnPrimaryComponent, 
    BtnSecondaryComponent,
    MatFormFieldModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './dialog-finalizar-consulta.component.html',
  styleUrl: './dialog-finalizar-consulta.component.scss'
})
export class DialogFinalizarConsultaComponent {


  turnosListEspera : TurnoListaDeEspera[] = [];

  constructor(private dialogRef: MatDialogRef<DialogFinalizarConsultaComponent>,
    private router : Router,
    private toastr : ToastrService,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    //OBSERVABLES

    this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
      this.turnosListEspera = turnosEnListaDeEspera;
    });

    //------------------
    
      }


  imprimirComprobante(){
    this.dialogRef.close();
    this.toastr.success('Comprobante impreso correctamente')

    if (this.router.url === '/estudiosClinicos/historiaClinica') {
      if(this.turnosListEspera.length){
        this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente']);
      }else{
        this.router.navigate(['estudiosClinicos/listaEsperaProf']);
      }
    }
  }
      
  finalizarConsulta(): void {
    this.dialogRef.close();
      //ACTUALIZACION DE RUTAS
      if (this.router.url === '/estudiosClinicos/historiaClinica') {
        if(this.turnosListEspera.length){
          this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente']);
        }else{
          this.router.navigate(['estudiosClinicos/listaEsperaProf']);
        }
      }
      
  }
}
