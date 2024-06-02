import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-btn-inactive',
  standalone: true,
  imports: [],
  templateUrl: './btn-inactive.component.html',
  styleUrl: './btn-inactive.component.scss'
})
export class BtnInactiveComponent {
  @Input() buttonText : string = "";

}

