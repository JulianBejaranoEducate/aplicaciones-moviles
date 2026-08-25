import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Catalogo } from './components/catalogo/catalogo';

@Component({
  selector: 'app-root',
  imports: [Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
