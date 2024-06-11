import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { TurnoService } from '../../services/turno.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscar-turno',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, BtnInactiveComponent, BtnSecondaryComponent, ReactiveFormsModule],
  templateUrl: './buscar-turno.component.html',
  styleUrl: './buscar-turno.component.scss'
})
export class BuscarTurnoComponent {
  dniFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  currentRoute: string | undefined;
  turnosList : TurnoDTO[]  = [];




  constructor(
    private router: Router,
    private toastr: ToastrService,
    private turnoService: TurnoService,
  ){

  }






  ngOnInit(): void {
    this.currentRoute = this.router.url;

    if(this.currentRoute?.includes('consultoriosExternos/acreditarTurno')){
      //busqueda de turno:
      this.turnosList= this.turnoService.getTurnos();
      }

  }

  



  navegarAConfirmarPaciente(value : any){   
    console.log("value: ", value);
    const turnosFiltradosEnCursoByDni =  this.turnosList.filter(turno => turno.paciente?.dniPaciente == value);
    this.turnoService.setTurnosEncontradosByDNI(turnosFiltradosEnCursoByDni);
    console.log("turnosListBuscarTurnoByDNI: ", turnosFiltradosEnCursoByDni);
    if(turnosFiltradosEnCursoByDni.length > 0){
      if (this.router.url === '/estudiosClinicos/acreditarTurno') {
        this.router.navigate(['estudiosClinicos/acreditarTurno/confirmarTurno']);
      } 
      if (this.router.url === '/consultoriosExternos/acreditarTurno') {
        this.router.navigate(['consultoriosExternos/acreditarTurno/confirmarTurno']);
      }

    }else{
      this.toastr.error('No se han encontrado turnos ','Error' );
    }

  }

  volver(){
    if (this.router.url === '/estudiosClinicos/acreditarTurno') {
      this.router.navigate(['estudiosClinicos']);
    }
    if (this.router.url === '/consultoriosExternos/acreditarTurno') {
      this.router.navigate(['consultoriosExternos']);
    }
  }
}
