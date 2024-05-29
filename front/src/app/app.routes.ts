import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './login/components/login-layout/login-layout.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './main/components/main-layout/main-layout.component';
import { MenuTurnosComponent } from './admin/components/menu-turnos/menu-turnos.component';
import { SeleccionarEstudioComponent } from './admin/components/estudios-clinicos/seleccionar-estudio/seleccionar-estudio.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent
    },
    {
        path: 'inicioAdmin',
        component: AdminLayoutComponent,
    },
    {
        path: 'estudiosClinicosAdmin', component: MainLayoutComponent,
        children: [
            {path: 'gestionarTurnos', component: MenuTurnosComponent},
            {path: 'nuevoTurno', component: SeleccionarEstudioComponent}
        ]
    }
];
