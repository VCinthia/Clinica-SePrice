import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './shared/components/login/login.component';
import { SeleccionSectorComponent } from './shared/components/circuitos/circuitos.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MenuTurnosComponent } from './shared/components/menu-turnos/menu-turnos.component';
import { SeleccionarEstudioComponent } from './features/estudios-clinicos/components/seleccionar-estudio/seleccionar-estudio.component';
import { SeleccionarPracticaComponent } from './features/consultorios-externos/components/seleccionar-practica/seleccionar-practica.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent
    },
    {
        path: 'inicio',
        component: SeleccionSectorComponent ,
    },
    {
        path: 'estudiosClinicos', component: MainLayoutComponent,
        children: [
            {path: 'gestionarTurnos', component: MenuTurnosComponent},
            {path: 'nuevoTurno', component: SeleccionarEstudioComponent}
        ]
    },
    {
        path: 'consultoriosExternos', component: MainLayoutComponent,
        children: [
            {path: 'gestionarTurnos', component: MenuTurnosComponent},
            {path: 'nuevoTurno', component: SeleccionarPracticaComponent}
        ]
    }
];
