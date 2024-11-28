import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'alonzo-portfolio';
}
