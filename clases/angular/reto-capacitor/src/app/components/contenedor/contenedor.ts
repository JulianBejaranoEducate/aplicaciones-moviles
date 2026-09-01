import { Component, signal, computed } from '@angular/core';
import { Balota } from "../balota/balota";
import { Jugadores } from '../jugadores/jugadores';
import { Loteria } from '../../models/loteria';

@Component({
  selector: 'app-contenedor',
  imports: [Balota, Jugadores],
  templateUrl: './contenedor.html',
  styleUrl: './contenedor.css',
})
export class Contenedor {

  private loteria = new Loteria();

  number1 = signal(0);
  number2 = signal(0);
  number3 = signal(0);
  number4 = signal(0);
  number5 = signal(0);

  numerosSorteados = signal<number[]>([]);
  totalGanadores = signal(0);

  numberWin = computed(() =>
    `El número ganador es: ${this.number1()} ${this.number2()} ${this.number3()} ${this.number4()} ${this.number5()}`
  );

  playLotery(): void {
    const [n1, n2, n3, n4, n5] = this.loteria.jugar();
    this.number1.set(n1);
    this.number2.set(n2);
    this.number3.set(n3);
    this.number4.set(n4);
    this.number5.set(n5);
    this.numerosSorteados.set([]);
  }

  buscarGanadores(): void {
    this.numerosSorteados.set(this.loteria.getNumeros());
  }

  onCantidadGanadores(cantidad: number): void {
    this.totalGanadores.set(cantidad);
  }
}
