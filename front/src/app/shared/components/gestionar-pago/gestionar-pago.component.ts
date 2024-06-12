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
  ){
    this.selectedOption = '';
  }


  ngOnInit(): void {
    this.currentRoute = this.router.url;

    if(this.currentRoute?.includes('/consultoriosExternos/gestionarPago')){
      //busqueda de turno:
      this.turnoAFacturar= this.turnoService.getTurnoAFacturar();
      }

  }





  navegarAConfirmarAcreditacion(){
    //todo: agregar confirmar actualizar -> update turno (metodo)
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
}
