import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contenedor } from "./components/contenedor/contenedor";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Contenedor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loteria');
}
