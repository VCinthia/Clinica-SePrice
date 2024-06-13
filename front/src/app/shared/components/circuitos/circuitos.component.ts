import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { TurnoService } from '../../services/turno.service';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { HistoriaClinicaDTO } from '../../../core/dtos/historia-clinica.dto';

@Component({
  selector: 'app-circuitos',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './circuitos.component.html',
  styleUrl: './circuitos.component.scss'
})
export class CircuitosComponent {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private historiaClinicaService: HistoriaClinicaService,
  ) {}



  ngOnInit(): void {
    //RESETEAR OBSERVABLES - menos el ususario
    this.turnoService.setTurnos([]);
    this.turnoService.setTurnosEncontradosElUserLogueado([]);
    this.turnoService.setTurnoAFacturar(new TurnoDTO);
    this.turnoService.setTurnosEnListaDeEspera([]);
    this.turnoService.setShowBtnComenzarLLamadas(true);
    this.historiaClinicaService.setHistoriaClinicaDBEdit(new HistoriaClinicaDTO);

  
    }
  


  navegarAConsultoriosExternos() {
    this.router.navigate(['/consultoriosExternos']);
  }

  navegarAEstudiosClinicos() {
  this.router.navigate(['/estudiosClinicos']);
}
}
