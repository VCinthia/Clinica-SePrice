import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { MatRadioButton } from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { ToastrService } from 'ngx-toastr';
import { TurnoService } from '../../services/turno.service';
import { CommonModule } from '@angular/common';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';
import { ApiService } from '../../../services/api.service';
import { TurnoListaDeEspera } from '../../../core/dtos/turno-lista-espera.dto';
import { ListaEsperaAdminComponent } from '../lista-espera-admin/lista-espera-admin.component';

@Component({
  selector: 'app-gestionar-pago',
  standalone: true,
  imports: [FormsModule, BtnInactiveComponent, BtnPrimaryComponent, BtnSecondaryComponent, MatRadioButton, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './gestionar-pago.component.html',
  styleUrl: './gestionar-pago.component.scss'
})
export class GestionarPagoComponent {

  currentRoute: string | undefined;
  turnoAFacturar : TurnoDTO  = new TurnoDTO;
  selectedOption : string;
  obraSocial = new FormControl('', Validators.required);
  metodoPago = new FormControl('', Validators.required);


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private turnoService: TurnoService,
    private apiService: ApiService,
  ){
    this.selectedOption = '';
  }


  ngOnInit(): void {
    this.currentRoute = this.router.url;
    //OBSERVABLES
    this.turnoService.turnoAFacturar$.subscribe((turnoAFacturar)=>{
      this.turnoAFacturar = turnoAFacturar;
    })

    //------------------

  }




  async navegarAConfirmarAcreditacion(){
    //Se actualiza el Estado del turno a Confirmado, y se actualiza la lista de Espera
    const turnoPersistido = await this.actualizarEstadoTurno(this.turnoAFacturar.turnoId!, eEstadoTurno.CONFIRMADO);
    const turnoSavedListaEsperaFormat = this.convertirTurnoAListaDeESperaTurno(turnoPersistido);
    console.log("TurnosSAVEEED", turnoSavedListaEsperaFormat);
    this.turnoService.addTurnoEnListaDeEspera(turnoSavedListaEsperaFormat);






    if(this.selectedOption =="obraSocial"){

    }else if(this.selectedOption == "particular"){

    }
//TODOOOOOOOOOOO: VER CONFIRMADOS PARA LISTA DE ESPERAA


    if (this.router.url === '/estudiosClinicos/gestionarPago') {
      this.router.navigate(['estudiosClinicos/generarFactura']);
      //aqui se genra lafactura -> se muestra el turno
    }
    if (this.router.url === '/consultoriosExternos/gestionarPago') {
      this.router.navigate(['consultoriosExternos/generarFactura']);
    }
  }

  volver(){
    if (this.router.url === '/estudiosClinicos/gestionarPago') {
      this.router.navigate(['estudiosClinicos/acreditarTurno/confirmarTurno']);
    }
    if (this.router.url === '/consultoriosExternos/gestionarPago') {
      this.router.navigate(['consultoriosExternos/acreditarTurno/confirmarTurno']);
    }
  }




  async actualizarEstadoTurno(idTurno: number, estadoNuevo: eEstadoTurno): Promise<TurnoDTO> {
    return new Promise<TurnoDTO>((resolve, reject) => {
      const estadoString: string = estadoNuevo;
      this.apiService.actualizarEstadoDelTurno(idTurno, estadoNuevo).subscribe({
        next: (response) => {
          if (!response.success) {
            this.toastr.error('No se pudo actualizar el estado', 'Error');
            reject(new Error('No se pudo actualizar el estado'));
          } else {
            this.toastr.success("El turno ha sido " + estadoString);
            resolve(response.data!);
          }
        },
        error: (error) => {
          this.toastr.error(error?.message, 'Error');
          console.error('Error al actualizar estado del turno', error);
          reject(error);
        },
        complete: () => {
          // No se necesita hacer nada en complete
        }
      });
    });
  }
  


  convertirTurnoAListaDeESperaTurno(turno: TurnoDTO): TurnoListaDeEspera {
    const pacienteNombre = `${turno.paciente?.persona?.nombre}, ${turno.paciente?.persona?.apellido }`;
    const pacienteDNI = turno.paciente?.dniPaciente!; 
    const profesional = `Dr. ${turno.profesional?.persona?.nombre }, ${turno.profesional?.persona?.apellido}`;
    const turnoIdCustom = `T-${turno.turnoId}`;
    
    let turnoListaDeEsperaFormat = new TurnoListaDeEspera(pacienteNombre, pacienteDNI ,turno.inicioFechaHora!,profesional,turnoIdCustom,turno.turnoId!)
    return turnoListaDeEsperaFormat;
  }
  


}
