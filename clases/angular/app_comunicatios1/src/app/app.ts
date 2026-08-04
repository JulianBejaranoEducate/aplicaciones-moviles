import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Son } from "./components/son/son";
import { Father } from "./components/father/father";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Son, Father],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app_comunicatios1');
}
