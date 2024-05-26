import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { MenuTurnosComponent } from './admin/components/menu-turnos/menu-turnos.component';
import { SeleccionarEstudioComponent } from './admin/components/estudios-clinicos/seleccionar-estudio/seleccionar-estudio.component';
import { SeleccionarPracticaComponent } from './admin/components/consultorios-externos/seleccionar-practica/seleccionar-practica.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginFormComponent, MenuTurnosComponent, SeleccionarEstudioComponent, SeleccionarPracticaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
