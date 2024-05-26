import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { BtnPrimaryComponent } from '../../../shared/components/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../../../shared/components/btn-secondary/btn-secondary.component';

@Component({
  selector: 'app-menu-turnos',
  standalone: true,
  imports: [MatCard, BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './menu-turnos.component.html',
  styleUrl: './menu-turnos.component.css'
})
export class MenuTurnosComponent {

}
