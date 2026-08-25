import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contador } from './components/contador/contador';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Contador],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
