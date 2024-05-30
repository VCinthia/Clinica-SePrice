import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { MenuTurnosComponent } from './admin/components/menu-turnos/menu-turnos.component';
import { SeleccionarEstudioComponent } from './admin/components/estudios-clinicos/seleccionar-estudio/seleccionar-estudio.component';
import { SeleccionarPracticaComponent } from './admin/components/consultorios-externos/seleccionar-practica/seleccionar-practica.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { ToolbarComponent } from './layout/components/toolbar/toolbar.component';
import { MainLayoutComponent } from './main/components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, RouterOutlet, FooterComponent ,LoginFormComponent, MenuTurnosComponent, SeleccionarEstudioComponent, SeleccionarPracticaComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Clínica SePrice';
}
