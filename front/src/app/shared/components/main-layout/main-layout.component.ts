import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { eTipoTurno } from '../../../core/enums/tipo-turno.enum';
import { eEstadoTurno } from '../../../core/enums/estado-turno.enum';
import { eEspecialidad } from '../../../core/enums/especialidad.enum';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { eTipoUsuario } from '../../../core/enums/tipo-usuario.enum';

interface Sidenav {
  name: string;
  route: string;
}


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent{
  
  currentRoute: string | undefined;

  usuarioLogueado : UsuarioDTO | null  = new UsuarioDTO;

  sidenavConsultoriosExternos : Sidenav[] = [];
  sidenavEstudiosClinicos : Sidenav[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router, 
    private usuarioService: UsuarioService,
    private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    //metodo de prueba,  eliminar
    this.getPersonaByDni(1); 
    this.getProfesionalByDni(1);
    this.getAllInsumos();
    this.getAllTurnos();
    this.getTurnosByEspecialidadAndProfesionalId(eTipoTurno.CONSULTA,eEspecialidad.LABORATORIO,1);
    this.usuarioLogueado = this.usuarioService.getUsuarioLogeado();

    if (this.usuarioLogueado?.tipo === eTipoUsuario.ADMINISTRATIVO) {
      this.sidenavEstudiosClinicos = this.sidenavEstudiosClinicosAdmin;
      this.sidenavConsultoriosExternos  = this.sidenavConsultoriosExternosAdmin
    } else {
      this.sidenavEstudiosClinicos = this.sidenavProfesional;
      this.sidenavConsultoriosExternos = this.sidenavProfesional;

    }

    }

     //metodo de prueba, eliminar
  getPersonaByDni(dni: number): void {
    this.apiService.getPersona(dni).subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No se ha encontrado la persona','Error' );
        }
        this.toastr.success('persona encontrada','')
        console.log('Persona data:', response);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
  }

  getUser(): UsuarioDTO | null {
    return this.usuarioService.getUsuarioLogeado();
  }

  getProfesionalByDni(dni: number): void {
    this.apiService.getProfesional(dni).subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No se ha encontrado al profesional con el dni: '+ dni,'Error' );
        }
        this.toastr.success('profesional encontrado','')
        console.log('Profesional data:', response);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
  }

   getAllInsumos():void{
    this.apiService.getAllInsumos().subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No existen insumos','Error' );
        }
        this.toastr.success('Insumos encontrados','')
        console.log('Insumos data:', response);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
   }

   getAllTurnos():void{
    this.apiService.getAllTurnos().subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No hay turnos registrados','Error' );
        }
        this.toastr.success('Turnos encontrados','')
        console.log('Turnos data:', response);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
   }

   getTurnosByEspecialidadAndProfesionalId(tipo: eTipoTurno, especialidad: eEspecialidad, profesionalDni: number): void {   
    this.apiService.getTurnosByEspecialidadAndProfesional(tipo, especialidad, profesionalDni).subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No se han encontrado turnos ','Error' );
        }
        this.toastr.success('Turnos por especialidad Encontrados','')
        console.log('Turnos filtrados data:', response);
      },
      error:(error) => {
        this.toastr.error(error?.message, 'Error' );
        console.error('Error fetching turnos data:', error);
      },
      complete: () => {
      }
    });
  }


  sidenavEstudiosClinicosAdmin: Sidenav[] = [
    {name: 'Gestionar Turnos', route:'gestionarTurnos'},
    {name: 'Acreditar Turnos',route:'acreditarTurno'},
    {name: 'Ver Lista de Espera', route:'listaEspera'},
    {name: 'Controlar Insumos', route:'controlarInsumos'},
    {name: 'Volver al Menu Principal', route:'/inicio'},
    {name: 'Cerrar Sesión', route:''}
  ];

  sidenavProfesional: Sidenav[] =[
    {name: 'Ver Lista de Espera', route: 'listaEsperaProf'},
    {name: 'Historias Clínicas', route: 'historiasClinicas'},
    {name: 'Volver al Menu Principal', route: '/inicio'},
    {name: 'Cerrar Sesión', route:''}
  ]

  sidenavConsultoriosExternosAdmin: Sidenav[] = [
    {name: 'Gestionar Turnos', route:'gestionarTurnos'},
    {name: 'Acreditar Turnos',route:'acreditarTurno'},
    {name: 'Ver Lista de Espera', route:'listaEspera'},
    {name: 'Volver al Menu Principal', route:'/inicio'},
    {name: 'Cerrar Sesión', route:''}
  ];

}
