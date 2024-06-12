import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {ActivatedRoute,Router,RouterLink,RouterModule,} from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { eTipoTurno } from '../../../core/enums/tipo-turno.enum';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { eTipoUsuario } from '../../../core/enums/tipo-usuario.enum';
import { TurnoService } from '../../services/turno.service';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';

interface Sidenav {
  name: string;
  route: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  //CONSTANTES:
  sidenavEstudiosClinicosAdmin: Sidenav[] = [
    { name: 'Gestionar Turnos', route: 'gestionarTurnos' },
    { name: 'Acreditar Turnos', route: 'acreditarTurno' },
    { name: 'Ver Lista de Espera', route: 'listaEspera' },
    { name: 'Controlar Insumos', route: 'controlarInsumos' },
    { name: 'Volver al Menu Principal', route: '/inicio' },
    { name: 'Cerrar Sesión', route: '' },
  ];

  sidenavProfesional: Sidenav[] = [
    { name: 'Ver Lista de Espera', route: 'listaEsperaProf' },
    { name: 'Historias Clínicas', route: 'historiasClinicas' },
    { name: 'Volver al Menu Principal', route: '/inicio' },
    { name: 'Cerrar Sesión', route: '' },
  ];

  sidenavConsultoriosExternosAdmin: Sidenav[] = [
    { name: 'Gestionar Turnos', route: 'gestionarTurnos' },
    { name: 'Acreditar Turnos', route: 'acreditarTurno' },
    { name: 'Ver Lista de Espera', route: 'listaEspera' },
    { name: 'Volver al Menu Principal', route: '/inicio' },
    { name: 'Cerrar Sesión', route: '' },
  ];

  currentRoute: string | undefined;
  usuarioLogueado: UsuarioDTO | null = new UsuarioDTO();
  turnosEncontradosList: TurnoDTO[] = [];
  sidenavConsultoriosExternos: Sidenav[] = [];
  sidenavEstudiosClinicos: Sidenav[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    //OBSERVABLES
    this.turnoService.turnosEncontradosElUserLogueado$.subscribe(
      (turnosConFirmadosByUser) => {
        this.turnosEncontradosList = turnosConFirmadosByUser;
      }
    );
    this.usuarioService.usuarioLogeado$.subscribe((usuarioLogeado) => {
      this.usuarioLogueado = usuarioLogeado;
    });
    //----------------------

    this.currentRoute = this.router.url;
    this.setSideBarAndGetTurnosListByUser();
  }




  setSideBarAndGetTurnosListByUser(): void {
    //ADMIN
    if (this.usuarioLogueado?.tipo === eTipoUsuario.ADMINISTRATIVO) {
      this.sidenavEstudiosClinicos = this.sidenavEstudiosClinicosAdmin;
      this.sidenavConsultoriosExternos = this.sidenavConsultoriosExternosAdmin;
      //busqueda de turnos:
      if (this.currentRoute?.includes('estudiosClinicos')) {
        this.getTurnosByTipoPendientesHoy(eTipoTurno.ESTUDIO);
      } else if (this.currentRoute?.includes('consultoriosExternos')) {
        this.getTurnosByTipoPendientesHoy(eTipoTurno.CONSULTA);
      }

    //PROFESIONAL  
    } else if (this.usuarioLogueado?.tipo === eTipoUsuario.PROFESIONAL) {
      this.sidenavEstudiosClinicos = this.sidenavProfesional;
      this.sidenavConsultoriosExternos = this.sidenavProfesional;
      //busqueda de turnos:
      if (this.currentRoute?.includes('estudiosClinicos')) {
        this.getTurnosByTipoProfesionalIdConfirmadosHoy(eTipoTurno.ESTUDIO, this.usuarioLogueado?.persona?.dni! );
      } else if (this.currentRoute?.includes('consultoriosExternos')) {
        this.getTurnosByTipoProfesionalIdConfirmadosHoy( eTipoTurno.CONSULTA, this.usuarioLogueado?.persona?.dni!);
      }
    }
  }




  getTurnosByTipoPendientesHoy(tipo:eTipoTurno): void {
    this.apiService.getTurnosByTipoAndDayAndEstado(tipo, eEstadoTurno.PENDIENTE, new Date()).subscribe({
      next: (response) => {
        if (!response) {
          this.toastr.error('No hay turnos registrados', 'Error');
          return;
        }

        if (response.length) {
          let turnosPendientes = response;
          //Ordenar Turnos
          turnosPendientes.sort((a, b) => {
            const fechaA = new Date(a.inicioFechaHora!).getTime();
            const fechaB = new Date(b.inicioFechaHora!).getTime();
            return fechaA - fechaB; // Orden ascendente
          });
          this.toastr.success('Tiene ' + turnosPendientes.length + ' turnos asignados');
          //Actualizo el servicio con los turnos de la Base
          this.turnoService.setTurnos(turnosPendientes);
          console.log('TurnosConfirmados: ', turnosPendientes);
        } else {
          this.toastr.warning('No tiene turnos confirmados');
        }
      },
      error: (error) => {
        this.toastr.warning(error.error?.message, 'Error');
        console.error('Error al obtener turnos:', error);
      },
    });
  }


  getTurnosByTipoProfesionalIdConfirmadosHoy(tipo: eTipoTurno, profesionalDni: number ): void {
    this.apiService.getTurnosByTipoAndProfesionalAndDayAndEstado( tipo, profesionalDni, new Date(), eEstadoTurno.CONFIRMADO ).subscribe({
        next: (response) => {
          if (!response) {
            this.toastr.warning('Error al obtener turnos confirmados');
            return;
          }
          if (response.length) {
            let turnosConfirmados = response;
            //Ordenar Turnos
            turnosConfirmados.sort((a, b) => {
              const fechaA = new Date(a.inicioFechaHora!).getTime();
              const fechaB = new Date(b.inicioFechaHora!).getTime();
              return fechaA - fechaB; // Orden ascendente
            });
            this.toastr.success('Tiene ' + turnosConfirmados.length + ' turnos asignados');
            //Actualizo el servicio con los turnos de la Base
            this.turnoService.setTurnos(turnosConfirmados);
            console.log('TurnosConfirmados: ', turnosConfirmados);
          } else {
            this.toastr.warning('No tiene turnos confirmados');
          }
        },
        error: (error) => {
          this.toastr.warning(error.error?.message, 'Error');
          console.error('Error al obtener turnos:', error);
        },
      });
  }


  // getAllInsumos() {
  //   this.apiService.getAllInsumos().subscribe({
  //     next: (response) => {
  //       if (!response) {
  //         this.toastr.error('No existen insumos', 'Error');
  //       }
  //       this.toastr.success('Insumos encontrados', '');
  //       console.log('Insumos data:', response);
  //       //TODO: guardar insumos en obserbable
  //     },
  //     error: (error) => {
  //       this.toastr.error(error.error?.message, 'Error');
  //       console.error('Error al ObtenerInsumos:', error);
  //     },
  //     complete: () => {},
  //   });
  // }


}
