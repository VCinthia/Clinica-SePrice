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
import { eGrupo } from '../../../core/enums/grupo.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogCerrarSesionComponent } from '../dialog-cerrar-sesion/dialog-cerrar-sesion.component';

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
    // { name: 'Historias Clínicas', route: 'historiasClinicas' },
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
    public dialog: MatDialog
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
      if(this.usuarioLogueado?.grupo === eGrupo.ESTUDIOS_CONSULTORIOS){
        this.sidenavEstudiosClinicos = this.sidenavEstudiosClinicosAdmin;
        this.sidenavConsultoriosExternos = this.sidenavConsultoriosExternosAdmin;
      } else{
        this.sidenavEstudiosClinicos = this.sidenavEstudiosClinicosAdmin.filter(item => item.name !== 'Volver al Menu Principal');
        this.sidenavConsultoriosExternos = this.sidenavConsultoriosExternosAdmin.filter(item => item.name !== 'Volver al Menu Principal');
      }
      //busqueda de turnos:

    //PROFESIONAL  
    } else if (this.usuarioLogueado?.tipo === eTipoUsuario.PROFESIONAL) {
      this.sidenavEstudiosClinicos = this.sidenavProfesional;
      this.sidenavConsultoriosExternos = this.sidenavProfesional;
    }
  }

  cerrarSesion(): void {
    const dialogRef = this.dialog.open(DialogCerrarSesionComponent, {
      width: '400px',
      height: '250px'
    });

  }

}
