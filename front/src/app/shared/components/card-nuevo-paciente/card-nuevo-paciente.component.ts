import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-nuevo-paciente',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './card-nuevo-paciente.component.html',
  styleUrl: './card-nuevo-paciente.component.scss'
})
export class CardNuevoPacienteComponent {

  constructor(private toastr: ToastrService) {}

  abrirModalNuevoPaciente() {
    this.toastr.success('Paciente agregado correctamente');
  }
}
