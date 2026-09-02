import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Father } from './components/father/father';
import { Son } from './components/son/son';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Father, Son],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app_comunicatios1');
}
