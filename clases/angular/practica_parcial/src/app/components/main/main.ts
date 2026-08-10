import { Component, signal } from '@angular/core';
import { Son } from '../son/son';
import { Father } from '../father/father';

@Component({
  selector: 'app-main',
  imports: [Son, Father], // Aqui estoy importando los componentes "Son" = [Incrementar] y "Father" = [Decrementar]
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  contador = signal(0);

  actualizarContador(nuevoValor: number): void {
    this.contador.set(nuevoValor);
  }
}
