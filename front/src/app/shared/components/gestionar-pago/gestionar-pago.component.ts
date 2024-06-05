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

@Component({
  selector: 'app-gestionar-pago',
  standalone: true,
  imports: [FormsModule, BtnInactiveComponent, BtnPrimaryComponent, BtnSecondaryComponent, MatRadioButton, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './gestionar-pago.component.html',
  styleUrl: './gestionar-pago.component.scss'
})
export class GestionarPagoComponent {

  selectedOption : string;
  obraSocial = new FormControl('', Validators.required);
  metodoPago = new FormControl('', Validators.required);


  constructor(private router: Router){
    this.selectedOption = '';
  }

  navegarAConfirmarAcreditacion(){
    if (this.router.url === '/estudiosClinicos/gestionarPago') {
      this.router.navigate(['estudiosClinicos/generarFactura']);
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
