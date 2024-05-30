import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuTurnosComponent } from './shared/components/menu-turnos/menu-turnos.component';
import { SeleccionarEstudioComponent } from './features/estudios-clinicos/components/seleccionar-estudio/seleccionar-estudio.component';
import { SeleccionarPracticaComponent } from './features/consultorios-externos/components/seleccionar-practica/seleccionar-practica.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, RouterOutlet, FooterComponent, MenuTurnosComponent, SeleccionarEstudioComponent, SeleccionarPracticaComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Clínica SePrice';
}
