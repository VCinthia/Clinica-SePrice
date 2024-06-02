import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

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
export class MainLayoutComponent implements OnInit {
  
  currentRoute: string | undefined;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router, 
    private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    //metodo de prueba,  eliminar
    this.getPersona(12345678); 
  }


  //metodo de prueba, eliminar
  getPersona(dni: number): void {
    this.apiService.getPersona(dni).subscribe({
      next: (response) =>{
        if(!response){
          this.toastr.error('No se ha encontrado la persona','Error' );
        }
        this.toastr.success('persona encontrada','')
        console.log('Persona data:', response);
      },
      error:(error) => {
        this.toastr.error('No se ha encontrado la persona 2', 'Error' );
        console.error('Error fetching persona data:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  sidenavEstudiosClinicos: Sidenav[] = [
    {name: 'Gestionar Turnos', route:'gestionarTurnos'},
    {name: 'Acreditar Turnos',route:'gestionarTurnos'},
    {name: 'Ver Lista de Espera', route:'gestionarTurnos'},
    {name: 'Controlar Insumos', route:'gestionarTurnos'},
    {name: 'Volver al Menu Principal', route:'/inicio'},
    {name: 'Cerrar Sesión', route:'gestionarTurnos'}
  ];

  sidenavConsultoriosExternos: Sidenav[] = [
    {name: 'Gestionar Turnos', route:'gestionarTurnos'},
    {name: 'Acreditar Turnos',route:'gestionarTurnos'},
    {name: 'Ver Lista de Espera', route:'gestionarTurnos'},
    {name: 'Volver al Menu Principal', route:'/inicio'},
    {name: 'Cerrar Sesión', route:'gestionarTurnos'}
  ];

}
