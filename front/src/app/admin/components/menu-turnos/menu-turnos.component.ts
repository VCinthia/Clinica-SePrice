import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { BtnPrimaryComponent } from '../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../shared/components/btn-secondary/btn-secondary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-turnos',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './menu-turnos.component.html',
  styleUrl: './menu-turnos.component.css'
})
export class MenuTurnosComponent {
  
  constructor(private router: Router) {}


  navegarANuevoTurno() {
    this.router.navigate(['estudiosClinicosAdmin/nuevoTurno']);
  }
}
