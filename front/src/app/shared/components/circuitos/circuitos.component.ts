import { Component } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circuitos',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './circuitos.component.html',
  styleUrl: './circuitos.component.scss'
})
export class CircuitosComponent {

  constructor(private router: Router) {}

  navegarAConsultoriosExternos() {
    this.router.navigate(['/consultoriosExternos']);
  }

  navegarAEstudiosClinicos() {
  this.router.navigate(['/estudiosClinicos']);
}
}
