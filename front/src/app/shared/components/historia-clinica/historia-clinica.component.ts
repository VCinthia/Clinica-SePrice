import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGuardarHistoriaComponent } from '../dialog-guardar-historia/dialog-guardar-historia.component';
import { ToastrService } from 'ngx-toastr';
import { TurnoService } from '../../services/turno.service';
import { ApiService } from '../../../services/api.service';
import { TurnoListaDeEspera } from '../../../core/dtos/turno-lista-espera.dto';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaDTO } from '../../../core/dtos/historia-clinica.dto';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../../core/dtos/usuario.dto';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, BtnPrimaryComponent, CommonModule],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.scss'
})
export class HistoriaClinicaComponent {
  turnosListEspera : TurnoListaDeEspera[] = [];
  turnoUno : TurnoListaDeEspera | undefined;
  hoy : Date = new  Date();
  textoDelTextArea: string = '';
  historiaClinicaDB : HistoriaClinicaDTO | undefined;
  usuarioLogeado: UsuarioDTO | null= new UsuarioDTO;

  constructor(
    public dialog: MatDialog,
    private toastr : ToastrService,
    private turnoService: TurnoService,
    private usuarioService: UsuarioService,
    private apiService: ApiService,
    private historiaClinicaService: HistoriaClinicaService,

  ) {}



  ngOnInit(): void {
    //OBSERVABLES
    this.turnoService.turnosEnListaDeEspera$.subscribe((turnosEnListaDeEspera) => {
      this.turnosListEspera = turnosEnListaDeEspera;
      this.turnoUno = turnosEnListaDeEspera[0];

      
    });
     
    this.usuarioService.usuarioLogeado$.subscribe((usuarioLogeado) => {
      this.usuarioLogeado = usuarioLogeado;
    });

    this.historiaClinicaService.historiaClinicaDBEdit$.subscribe((historiaClinicaDBEdit) => {
      this.historiaClinicaDB = historiaClinicaDBEdit;
    });

    //------------------

    
      }

  notificacionConfirmar(): void {
    const dialogRef = this.dialog.open(DialogGuardarHistoriaComponent, {
      data: { nuevoDetalle: this.textoDelTextArea },
      width: '600px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('modal cerrado');
      console.log(this.turnosListEspera);
      
    });

  }






}
