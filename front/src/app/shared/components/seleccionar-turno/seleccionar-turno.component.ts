import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import { BtnInactiveComponent } from '../btn-inactive/btn-inactive.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { Router } from '@angular/router';
import { TurnosService } from '../../../services/turnos.service';
import { ApiService } from '../../../services/api.service';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { eEspecialidad } from '../../../core/enums/especialidad.enum';

@Component({
  selector: 'app-seleccionar-turno',
  standalone: true,
  imports: [DatePipe, MatTableModule, BtnPrimaryComponent, BtnSecondaryComponent, BtnInactiveComponent, FormsModule, MatRadioModule],
  templateUrl: './seleccionar-turno.component.html',
  styleUrl: './seleccionar-turno.component.scss'
})
export class SeleccionarTurnoComponent {

  //Todo: importo estructura dto
  practicaSeleccionada: eEspecialidad | null = null;
  estudioSeleccionado: string | null = null;
  turnoDto : TurnoDTO  | null = null;
  turnos : TurnoDTO [] = [];
  turnoSeleccionado : number = 0;
  
  selectedOption: string | null = null;


  //----- original:
  // selectedOption: string;
  // practicaSeleccionada : string = '';
  tiempoTurno : number  = 0;
  // estudioSeleccionado : string = '';
  listaTurnos: TurnoDTO[] = [];
  turnosTomados: any[] = [];
  //-----

  constructor(
    private router: Router,
    private turnosService: TurnosService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.selectedOption = ''
  };

  ngOnInit(): void {
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.turnosService.practicaSeleccionada$.subscribe(async practica => {
        this.practicaSeleccionada = practica.name;
        console.log('holis2', practica.name);

        this.tiempoTurno = practica.tiempoTurno;
        console.log('holis3', practica.tiempoTurno);

        if (practica) {
          console.log(practica, 'este es value');
          this.turnos = await this.turnosService.getTurnosByEspecialidad(practica.name);
          console.log('value.name: ', practica.name);

          console.log(this.turnos, 'este es turnos');
        }
      });

      this.getAllTurnos();
    }

    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.turnosService.estudioSeleccionado$.subscribe(estudio => {
        this.estudioSeleccionado = estudio.name;
      });
      //this.listaTurnos = this.turnosService.getListaTurnosEstudio()
      this.getAllTurnos();
    }
  }

  getAllTurnos():void{
    this.apiService.getAllTurnos().subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No hay turnos registrados','Error' );
        }
        this.toastr.success('Turnos encontrados','')
        this.turnosTomados = response.filter(objeto => objeto.especialidad === this.practicaSeleccionada);
        console.log('Turnos data:', this.turnosTomados);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
  }


  displayedColumns = ['fecha', 'horaInicio', 'profesional', 'select'];



  navegarAIngresarPaciente(){
    const turnoSeleccionado = this.turnos.find(
      turno => turno.inicioFechaHora + '-' + turno.esSobreturno === this.selectedOption
    );
    console.log(turnoSeleccionado);
    
    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.router.navigate(['estudiosClinicos/ingresarPaciente']);
    }
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.router.navigate(['consultoriosExternos/ingresarPaciente']);
    }
  }

  volver(){
    if (this.router.url === '/estudiosClinicos/seleccionarTurno') {
      this.router.navigate(['estudiosClinicos/nuevoTurno']);
    }
    if (this.router.url === '/consultoriosExternos/seleccionarTurno') {
      this.router.navigate(['consultoriosExternos/nuevoTurno']);
    }
  }
}
