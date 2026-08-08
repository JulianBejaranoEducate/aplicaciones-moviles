import { Component } from '@angular/core';
import { Incrementar } from '../incrementar/incrementar';
import { Decrementar } from '../decrementar/decrementar';

@Component({
  selector: 'app-contador',
  imports: [Incrementar, Decrementar],
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class Contador {
  public contador: number = 0;

  public actualizarContador(nuevoValor: number): void {
    this.contador = nuevoValor;
  }
}
