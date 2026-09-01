import { Component, signal, computed, effect, input, output } from '@angular/core';
import { Jugador } from '../../models/jugador';


@Component({
  selector: 'app-jugadores',
  imports: [],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class Jugadores {

  // input
  numerosGanadores = input<number[]>([]);

  // output
  cantidadGanadores = output<number>();

  // signal
  jugadores = signal<Jugador[]>([
    new Jugador('Juan', 'Pérez', 1),
    new Jugador('María', 'García', 2),
    new Jugador('Carlos', 'Farfán', 8),
    new Jugador('Ana', 'Cardenas', 3),
  ]);

  // computed(): se recalcula solo cuando cambian jugadores() o numerosGanadores()
  ganadores = computed(() =>
    this.jugadores().filter(j => this.numerosGanadores().includes(j.numeroJugado))
  );

  constructor() {
    // effect(): cada vez que cambia "ganadores", notificamos al padre
    effect(() => {
      this.cantidadGanadores.emit(this.ganadores().length);
    });
  }

  // 1. Arreglo de jugadores con propiedades (nombre, apellido y número jugado).
  // jugadores = [
  //   { nombres: 'Juan', apellidos: 'Pérez', numeroJugado: 12 },
  //   { nombres: 'María', apellidos: 'García', numeroJugado: 27 },
  //   { nombres: 'Carlos', apellidos: 'Lopez', numeroJugado: 8 },
  //   { nombres: 'Ana', apellidos: 'Cardenas', numeroJugado: 33 }
  // ];
}
