import { Component, signal } from '@angular/core';
import { Incrementar } from "../incrementar/incrementar";
import { Decrementar } from "../decrementar/decrementar";

@Component({
  selector: 'app-contador',
  imports: [Incrementar, Decrementar],
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class Contador {
  contador = signal(0);

  actulizarContador(nuevoValor: number): void {
    this.contador.set(nuevoValor);
  }

}
