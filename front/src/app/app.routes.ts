import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './login/components/login-layout/login-layout.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent
    },
    {
        path: 'inicio',
        component: AdminLayoutComponent
    }
];
