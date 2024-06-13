import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { TurnoService } from '../../services/turno.service';
import { TurnoDTO } from '../../../core/dtos/turno.dto';

@Component({
  selector: 'app-generar-factura',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './generar-factura.component.html',
  styleUrl: './generar-factura.component.scss'
})
export class GenerarFacturaComponent {
  turnoAFacturar : TurnoDTO  = new TurnoDTO;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private turnoService: TurnoService,
    private apiService: ApiService,
  ) {}




  ngOnInit(): void {
    //OBSERVABLES
    this.turnoService.turnoAFacturar$.subscribe((turnoAFacturar)=>{
      this.turnoAFacturar = turnoAFacturar;
    })

    //------------------
    console.log("TurnoAFActurar:", this.turnoAFacturar);
    

  }



  
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
