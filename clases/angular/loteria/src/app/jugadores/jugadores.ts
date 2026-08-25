import { Component, input, output, OnInit } from '@angular/core';
import { Jugador } from '../models/jugador.model';

@Component({
  selector: 'app-jugadores',
  imports: [],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class Jugadores implements OnInit {
  // el componente principal le dice a este componente quiénes son los ganadores actuales, para poder resaltarlos.
  ganadores = input<Jugador[]>([]);

  //  avisa al padre qué jugadores existen.
  jugadoresListos = output<Jugador[]>();

  // Cada jugador es un objeto real de la clase Jugador
  arregloJugadores: Jugador[] = [
    new Jugador('Ana', 'Pérez', 12),
    new Jugador('Luis', 'Gómez', 8),
    new Jugador('María', 'López', 16),
  ];

  ngOnInit(): void {
    // Apenas el componente está listo, comparte su lista con el padre.
    this.jugadoresListos.emit(this.arregloJugadores);
  }

  esGanador(jugador: Jugador): boolean {
    return this.ganadores().includes(jugador);
  }
}
