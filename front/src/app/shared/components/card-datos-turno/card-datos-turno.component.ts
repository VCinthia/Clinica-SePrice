import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { TurnoService } from '../../services/turno.service';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { CommonModule } from '@angular/common';
import { eSexo } from '../../../core/enums/sexo.enum';

@Component({
  selector: 'app-card-datos-turno',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent, CommonModule],
  templateUrl: './card-datos-turno.component.html',
  styleUrl: './card-datos-turno.component.scss'
})
export class CardDatosTurnoComponent {
  turnosEnCursoByDNI : TurnoDTO[]  = [];
  primerTurno: TurnoDTO = new TurnoDTO;
  currentRoute = this.router.url;
  abreviatura: string = '';

  constructor(
    private router: Router,
    private turnoService: TurnoService,
  ){

  }



  ngOnInit(): void {
    //OBSERVABLES
    this.turnoService.turnosEncontradosElUserLogueado$.subscribe((turnoAcreditar)=>{
      this.turnosEnCursoByDNI = turnoAcreditar;
      this.primerTurno = this.turnosEnCursoByDNI[0];
      this.abreviatura = this.primerTurno.profesional?.persona?.sexo == eSexo.FEMENINO ? 'Dra. ':'Dr. '
      this.turnoService.setTurnoAFacturar(this.primerTurno);
    })
    


  }






  navegarAConfirmarTurno(){
  
    if (this.router.url === '/estudiosClinicos/acreditarTurno/confirmarTurno') {
      this.router.navigate(['estudiosClinicos/gestionarPago']);
    }
    if (this.router.url === '/consultoriosExternos/acreditarTurno/confirmarTurno') {
      this.router.navigate(['consultoriosExternos/gestionarPago']);
    }
  }
}
