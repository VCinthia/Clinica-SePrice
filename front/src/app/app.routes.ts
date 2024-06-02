import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { CircuitosComponent } from './shared/components/circuitos/circuitos.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MenuTurnosComponent } from './shared/components/menu-turnos/menu-turnos.component';
import { SeleccionarEstudioComponent } from './features/estudios-clinicos/components/seleccionar-estudio/seleccionar-estudio.component';
import { SeleccionarPracticaComponent } from './features/consultorios-externos/components/seleccionar-practica/seleccionar-practica.component';
import { SeleccionarTurnoComponent } from './shared/components/seleccionar-turno/seleccionar-turno.component';
import { IngresarDniPacienteComponent } from './shared/components/ingresar-dni-paciente/ingresar-dni-paciente.component';
import { CardNuevoPacienteComponent } from './shared/components/card-nuevo-paciente/card-nuevo-paciente.component';
import { CardDatosPacienteComponent } from './shared/components/card-datos-paciente/card-datos-paciente.component';
import { ConfirmarTurnoComponent } from './shared/components/confirmar-turno/confirmar-turno.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'inicio',
        component: CircuitosComponent ,
    },
    {
        path: 'estudiosClinicos', component: MainLayoutComponent,
        children: [
            {path: 'gestionarTurnos', component: MenuTurnosComponent},
            {path: 'nuevoTurno', component: SeleccionarEstudioComponent},
            {path: 'seleccionarTurno', component: SeleccionarTurnoComponent},
            {path: 'ingresarPaciente', component: IngresarDniPacienteComponent}
        ]
    },
    {
        path: 'consultoriosExternos', component: MainLayoutComponent,
        children: [
            {path: 'gestionarTurnos', component: MenuTurnosComponent},
            {path: 'nuevoTurno', component: SeleccionarPracticaComponent},
            {path: 'seleccionarTurno', component: SeleccionarTurnoComponent},
            {path: 'ingresarPaciente', component: IngresarDniPacienteComponent,
                children: [
                    {path: 'confirmarPaciente', component: CardDatosPacienteComponent},
                    {path: 'pacienteNoEncontrado', component: CardNuevoPacienteComponent}
                ]
            },
            {path: 'confirmarTurno', component: ConfirmarTurnoComponent}

        ]
    }
];
