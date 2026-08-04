import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title:string; // Cuando se usa el signo de "?" (title?:string) es para indicar que en algun momento se le va a pasar una valor a la variable.
  protected textP:string;
  protected edad:number = 18;

  constructor() {
    this.title = "Data Binding";
    this.textP = "Texto de prueba";
  }

  protected metodoClick():void {
    alert("Hola Luis");
    console.info("Hola Vallery y Sara");
  }
}
