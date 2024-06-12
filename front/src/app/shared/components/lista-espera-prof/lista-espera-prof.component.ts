import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { TurnoService } from '../../services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';

@Component({
  selector: 'app-lista-espera-prof',
  standalone: true,
  imports: [MatTableModule, FormsModule, RouterModule, BtnPrimaryComponent, CommonModule],
  templateUrl: './lista-espera-prof.component.html',
  styleUrl: './lista-espera-prof.component.scss',
})
export class ListaEsperaProfComponent {

  btnInvisible: boolean = false;
  currentRoute: string | undefined;
  usuarioLogueado : UsuarioDTO | null  = new UsuarioDTO;
  hoy: Date = new Date();
  turnosList : TurnoDTO[] = [];
  turnosConfirmadosListData: any = [];
  dataSource: any = [];
  displayedColumns: string[] = ['pacienteNombre', 'horario', 'profesional', 'numAtencion'];

  constructor(
    private router : Router,
    private route: ActivatedRoute, 
    private toastr : ToastrService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,

  ){
  }

  ngOnInit(): void {
  //OBSERVABLES
  this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
    this.dataSource = turnosEnListaDeEspera;
  });

  this.turnoService.showBtnComenzarLLamadas$.subscribe((showBtnComenzarLLamadas) => {
    this.btnInvisible = !showBtnComenzarLLamadas;});

  this.usuarioService.usuarioLogeado$.subscribe((usuarioLogueado) => {
    this.usuarioLogueado= usuarioLogueado;
  });  

  this.turnoService.showBtnComenzarLLamadas$.subscribe((showBTN) => {
    this.btnInvisible = showBTN;
  });
  //------------

    this.currentRoute = this.router.url;
    if (this.currentRoute === '/consultoriosExternos/listaEsperaProf' || this.currentRoute === '/estudiosClinicos/listaEsperaProf') {
      this.btnInvisible = false;
    }

  this.getAndSortListaTurnosConfirmados();

  }



  getAndSortListaTurnosConfirmados(){
    //Busco lista turnos para el usuario
    this.turnosList = this.turnoService.getTurnos();
      console.log("TurnosListOrdenada:",this.turnosList);

      //CREO LISTA PERSONALIZADA
      this.turnosConfirmadosListData = this.turnosList.map((turno, index) => {
        const pacienteNombre = `${turno.paciente?.persona?.nombre}, ${turno.paciente?.persona?.apellido}`;
        const pacienteDNI = `${turno.paciente?.persona?.dni}`;
        const profesional = `Dr. ${turno.profesional?.persona?.nombre}, ${turno.profesional?.persona?.apellido}`;
        const turnoIdCustom = `T-${index+1}`; // Usar el índice en lugar del id del turno
        return {
          'pacienteNombre': pacienteNombre,
          'pacienteDNI': pacienteDNI,
          'horario': turno.inicioFechaHora,
          'profesional': profesional,
          'numAtencion': turnoIdCustom,
          'idTurno': turno.turnoId
        };
      });

      // Asignar la lista ordenada al dataSource y al Servicio
      this.dataSource = this.turnosConfirmadosListData;
      this.turnoService.setTurnosEnListaDeEspera(this.turnosConfirmadosListData)

  }



  comenzarLlamados(){
    if(this.dataSource.length){
      this.btnInvisible = true;

      if (this.router.url === '/estudiosClinicos/listaEsperaProf') {
        this.router.navigate(['estudiosClinicos/listaEsperaProf/llamarPaciente']);
      } 
      if (this.router.url === '/consultoriosExternos/listaEsperaProf') {
        this.router.navigate(['consultoriosExternos/listaEsperaProf/llamarPaciente']);
      }
    }else{
      this.toastr.warning("No hay turnos")
    }
  }
  
    
}
