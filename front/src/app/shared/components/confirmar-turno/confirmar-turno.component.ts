import { Component, OnInit } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogTurnoConfirmadoComponent } from '../dialog-turno-confirmado/dialog-turno-confirmado.component';
import { PacienteDTO } from '../../../core/dtos/paciente.dto';
import { TurnoDTO } from '../../../core/dtos/turno.dto';
import { Router } from '@angular/router';
import { TurnosService } from '../../../services/turnos.service';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-turno',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent, CommonModule],
  templateUrl: './confirmar-turno.component.html',
  styleUrl: './confirmar-turno.component.scss'
})
export class ConfirmarTurnoComponent implements OnInit {
  pacienteSeleccionado: PacienteDTO | null = null;
  turnoSeleccionado: TurnoDTO | null = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private turnosService: TurnosService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/consultoriosExternos/confirmarTurno') {
      this.turnosService.turnoSeleccionado$.subscribe(turno => {
        this.turnoSeleccionado = turno;
        console.log('Turno Seleccionado conf.turno= ', this.turnoSeleccionado);
      });
      this.turnosService.pacienteSeleccionado$.subscribe(paciente => {
        this.pacienteSeleccionado = paciente;
        console.log('Paciente Seleccionado conf.turno = ', this.pacienteSeleccionado);
      });
    }
  }

  async notificacionConfirmar(): Promise<void> {
    if (this.turnoSeleccionado && this.pacienteSeleccionado) {
      await this.turnosService.crearTurnoEnBDD(this.turnoSeleccionado, this.pacienteSeleccionado);

      // Abre el diálogo de confirmación después de guardar el turno
      const dialogRef = this.dialog.open(DialogTurnoConfirmadoComponent, {
        width: '400px',
        height: '250px'
      });

    }
  }
}
