import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Father } from "./components/father/father";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Father],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app_comunicatios1');
}
