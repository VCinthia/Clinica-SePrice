import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  sidenavEstudiosClinicosAdmin: Sidenav[] = [
    {name: 'Gestionar Turnos', route:'gestionarTurnos'},
    {name: 'Acreditar Turnos',route:'gestionarTurnos'},
    {name: 'Ver Lista de Espera', route:'gestionarTurnos'},
    {name: 'Controlar Insumos', route:'gestionarTurnos'},
    {name: 'Volver al Menu Principal', route:'gestionarTurnos'},
    {name: 'Cerrar Sesión', route:'gestionarTurnos'}
  ];

}
