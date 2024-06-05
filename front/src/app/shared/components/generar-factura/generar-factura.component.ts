import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generar-factura',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './generar-factura.component.html',
  styleUrl: './generar-factura.component.scss'
})
export class GenerarFacturaComponent {

  constructor(private toastr: ToastrService, private router: Router) {}

  
  imprimirFactura(){
    this.toastr.success('Factura impresa exitosamente');
  }

  navegarAInicio(){
    if (this.router.url === '/estudiosClinicos/generarFactura') {
      this.router.navigate(['estudiosClinicos']);
    }
    if (this.router.url === '/consultoriosExternos/generarFactura') {
      this.router.navigate(['consultoriosExternos']);
    }
  }
}
