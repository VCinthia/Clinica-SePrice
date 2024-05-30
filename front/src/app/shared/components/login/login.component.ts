import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCard} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from '../btn-secondary/btn-secondary.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCard, BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;

  
  constructor(private router: Router) {}

  navegarAInicio() {
  this.router.navigate(['/inicio']);
}

clickEvent(event: MouseEvent) {
  this.hide = !this.hide;
  event.stopPropagation();
}

}
