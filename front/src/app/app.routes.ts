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
import { BuscarTurnoComponent } from './shared/components/buscar-turno/buscar-turno.component';
import { CardDatosTurnoComponent } from './shared/components/card-datos-turno/card-datos-turno.component';
import { GestionarPagoComponent } from './shared/components/gestionar-pago/gestionar-pago.component';
import { GenerarFacturaComponent } from './shared/components/generar-factura/generar-factura.component';
import { ListaEsperaAdminComponent } from './shared/components/lista-espera-admin/lista-espera-admin.component';
import { ControlarInsumosComponent } from './features/estudios-clinicos/components/controlar-insumos/controlar-insumos.component';
import { ListaEsperaProfComponent } from './shared/components/lista-espera-prof/lista-espera-prof.component';
import { LlamadoPaciente1Component } from './shared/components/llamado-paciente-1/llamado-paciente-1.component';
import { LlamadoPaciente2Component } from './shared/components/llamado-paciente-2/llamado-paciente-2.component';
import { HistoriaClinicaComponent } from './shared/components/historia-clinica/historia-clinica.component';

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
            {path: 'ingresarPaciente', component: IngresarDniPacienteComponent},
            {path: 'acreditarTurno', component: BuscarTurnoComponent,
            children: [
                {path: 'confirmarTurno', component: CardDatosTurnoComponent},
                {path: 'turnoNoEncontrado', component: CardDatosTurnoComponent}
            ]
            },
            {path: 'controlarInsumos', component: ControlarInsumosComponent },
            {path: 'gestionarPago', component: GestionarPagoComponent},
            {path: 'generarFactura', component:GenerarFacturaComponent},
            {path: 'listaEspera', component: ListaEsperaAdminComponent},
            {path: 'listaEsperaProf', component: ListaEsperaProfComponent,
                children: [
                    {path: 'llamarPaciente', component: LlamadoPaciente1Component},
                    {path: 'llamarPaciente2', component:LlamadoPaciente2Component}
                ]
            },
            {path: 'historiaClinica', component: HistoriaClinicaComponent}
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
            {path: 'confirmarTurno', component: ConfirmarTurnoComponent},
            {path: 'acreditarTurno', component: BuscarTurnoComponent,
            children: [
                {path: 'confirmarTurno', component: CardDatosTurnoComponent},
                {path: 'turnoNoEncontrado', component: CardDatosTurnoComponent}
            ]
            },
            {path: 'gestionarPago', component: GestionarPagoComponent},
            {path: 'generarFactura', component:GenerarFacturaComponent},
            {path: 'listaEspera', component: ListaEsperaAdminComponent},
            {path: 'listaEsperaProf', component: ListaEsperaProfComponent,
                children: [
                    {path: 'llamarPaciente', component: LlamadoPaciente1Component},
                    {path: 'llamarPaciente2', component:LlamadoPaciente2Component}
                ]
            },
            {path: 'historiaClinica', component: HistoriaClinicaComponent}

        ]
    }
];
