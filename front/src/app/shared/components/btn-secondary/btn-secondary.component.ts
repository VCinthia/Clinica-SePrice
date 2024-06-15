import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-secondary',
  standalone: true,
  imports: [],
  templateUrl: './btn-secondary.component.html',
  styleUrl: './btn-secondary.component.css'
})
export class BtnSecondaryComponent {
 @Input() buttonText : string = "";
}
