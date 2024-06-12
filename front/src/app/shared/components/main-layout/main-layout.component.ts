import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
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
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent{
  
  currentRoute: string | undefined;
  usuarioLogueado : UsuarioDTO | null  = new UsuarioDTO;
  turnosList : TurnoDTO[] = [];

  sidenavConsultoriosExternos : Sidenav[] = [];
  sidenavEstudiosClinicos : Sidenav[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router, 
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    //metodo de prueba,  eliminar
    this.getAllInsumos();
   


    //busqueda de usuario:
    this.usuarioLogueado = this.usuarioService.getUsuarioLogeado();
    if (this.usuarioLogueado?.tipo === eTipoUsuario.ADMINISTRATIVO) {
      this.sidenavEstudiosClinicos = this.sidenavEstudiosClinicosAdmin;
      this.sidenavConsultoriosExternos  = this.sidenavConsultoriosExternosAdmin
        //busqueda de turnos:
        this.getAllTurnos();

    } else if (this.usuarioLogueado?.tipo === eTipoUsuario.PROFESIONAL){
      this.sidenavEstudiosClinicos = this.sidenavProfesional;
      this.sidenavConsultoriosExternos = this.sidenavProfesional;
       //busqueda de turnos:
       if(this.currentRoute?.includes('estudiosClinicos')){
        this.getTurnosByTipoAndProfesionalIdAndDay(eTipoTurno.ESTUDIO,this.usuarioLogueado?.persona?.dni!, new Date());
      }else if(this.currentRoute?.includes('consultoriosExternos')){
        this.getTurnosByTipoAndProfesionalIdAndDay(eTipoTurno.CONSULTA,this.usuarioLogueado?.persona?.dni!, new Date());
      }
    }

  
    }



  getUser(): UsuarioDTO | null {
    return this.usuarioService.getUsuarioLogeado();
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
        this.toastr.error(error.error?.message, 'Error' );
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
        this.turnosList = response;
        const turnosFiltradosEnCurso = this.turnosList.filter(turno => turno.estado != eEstadoTurno.FINALIZADO);
        if(this.currentRoute?.includes('estudiosClinicos')){
          const turnosFiltradosByTipo =  turnosFiltradosEnCurso.filter(turno => turno.tipo === eTipoTurno.ESTUDIO);
          //Actualizo el servicio con los turnos de la Base
          this.turnoService.setTurnos(turnosFiltradosByTipo);
          console.log("TurnosListECli: ", turnosFiltradosByTipo);
        }else if(this.currentRoute?.includes('consultoriosExternos')){
          const turnosFiltradosByTipo =  turnosFiltradosEnCurso.filter(turno => turno.tipo === eTipoTurno.CONSULTA);
          //Actualizo el servicio con los turnos de la Base
          this.turnoService.setTurnos(turnosFiltradosByTipo);
          console.log("TurnosListCEx: ", turnosFiltradosByTipo);
        }


      },
      error:(error) => {
        this.toastr.error(error.error?.message, 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
      }
    });
   }



   getTurnosByTipoAndProfesionalIdAndDay(tipo: eTipoTurno, profesionalDni: number, diaTurno: Date): void {   
    this.apiService.getTurnosByTipoAndProfesionalAndDay(tipo, profesionalDni, diaTurno).subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No se han encontrado turnos ','Error' );
        }
        if(response.length){
          this.toastr.success('Tiene '+ response.length+' turnos asignados','')
        }else{
          this.toastr.warning('No tiene turnos asignados','')
        }
        
        console.log('Turnos filtrados data:', response);
        this.turnosList= response;

        //Actualizo el servicio con los turnos de la Base
        this.turnoService.setTurnos(response)
        this.turnosList = response;

      },
      error:(error) => {
        this.toastr.error(error.error?.message, 'Error' );
        console.error('Error al obtener turnos:', error);
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
