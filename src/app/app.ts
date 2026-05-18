import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/shared/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly year = new Date().getFullYear();
}
