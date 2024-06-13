import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaDTO } from '../../../core/dtos/historia-clinica.dto';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';
import { TurnoService } from '../../services/turno.service';
import { TurnoListaDeEspera } from '../../../core/dtos/turno-lista-espera.dto';
import { DialogFinalizarConsultaComponent } from '../dialog-finalizar-consulta/dialog-finalizar-consulta.component';

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
  historiaClinicaDB : HistoriaClinicaDTO | undefined;
  usuarioLogeado: UsuarioDTO | null= new UsuarioDTO;
  turnoUno : TurnoListaDeEspera | undefined;
  turnosListEspera : TurnoListaDeEspera[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogGuardarHistoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router : Router,
    private toastr : ToastrService,
    private apiService: ApiService,
    private turnoService: TurnoService,
    private usuarioService: UsuarioService,
    private historiaClinicaService: HistoriaClinicaService,
    private dialog: MatDialog
  ) {}
  



  ngOnInit(): void {
    //OBSERVABLES
    this.historiaClinicaService.historiaClinicaDBEdit$.subscribe((historiaClinicaDBEdit) => {
      this.historiaClinicaDB = historiaClinicaDBEdit;
    });

    this.usuarioService.usuarioLogeado$.subscribe((usuarioLogeado) => {
      this.usuarioLogeado = usuarioLogeado;
    });

    this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
      this.turnosListEspera = turnosEnListaDeEspera;
      this.turnoUno = turnosEnListaDeEspera[0];
    });

    //------------------
    
      }






    guardarHistoriaClinica(){
    //put historia
    const nuevoText = (this.historiaClinicaDB?.detalle) ? ("\n" + this.data.nuevoDetalle) : this.data.nuevoDetalle;
    const detalleDB = (this.historiaClinicaDB?.detalle) ? this.historiaClinicaDB?.detalle : '';
    
    this.historiaClinicaDB!.detalle = detalleDB + nuevoText;
    this.actualizarHistoriaClinica(this.historiaClinicaDB!);



    this.dialogRef.close()

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(DialogFinalizarConsultaComponent);
    });
  }
  
  cancelar(){
    this.dialogRef.close();
  }



  

  actualizarHistoriaClinica(histCliUpdated: HistoriaClinicaDTO):void{
    this.apiService.actualizarHistoriaClinica(histCliUpdated, this.usuarioLogeado?.username! ).subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('Error al actualizar la historia clínica','Error' );
          return;
        }
        this.toastr.success('Historia clínica actualizada')
      },
      error:(error) => {
        this.toastr.error(error.error?.message, 'Error' );
        console.error('Error al actualizar Historiaclinica:', error);
      },
      complete: () => {
        this.actualizarEstadoTurno(this.turnoUno?.idTurno!, eEstadoTurno.FINALIZADO);
        
        
        
        const turnoEliminar = this.turnosListEspera[0];
        this.turnoService.removeTurnosEnListaDeEspera(turnoEliminar.idTurno);
        this.turnoService.removeTurno(turnoEliminar.idTurno);
        console.log("se elimino", this.turnosListEspera);
        console.log("this.turnosListEspera.length",this.turnosListEspera.length);
        

        //ACTUALIZACION DE RUTAS
        if (this.router.url === '/estudiosClinicos/historiaClinica') {
          if(this.turnosListEspera.length){
            this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente']);
          }else{
            this.router.navigate(['estudiosClinicos/listaEsperaProf']);
          }
        }
        
        if (this.router.url === '/consultoriosExternos/historiaClinica') {
          if(this.turnosListEspera.length){
            this.router.navigate(['consultoriosExternos/listaEsperaProf/llamarPaciente']);
          }else{
            this.router.navigate(['consultoriosExternos/listaEsperaProf']);
          }
        }
      }
    });
   }



   actualizarEstadoTurno(idTurno: number, estadoNuevo: eEstadoTurno) : void {  
    const estadoString : string = estadoNuevo;
    this.apiService.actualizarEstadoDelTurno(idTurno,estadoNuevo).subscribe({
      next: (response) =>{
        if(!response.success){
          this.toastr.error('No se pudo actualizar el estado ','Error' );
        }
          this.toastr.success("El turno ha sido "+ estadoString)
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error alactualizar estado del turno', error);
      },
      complete: () => {
      }
    });
  }



}
