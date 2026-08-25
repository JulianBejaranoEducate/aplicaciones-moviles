import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Jugadores } from './jugadores/jugadores';
import { Balot } from './balot/balot';
import { Jugador } from './models/jugador.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Balot, Jugadores],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // signal = estado reactivo. Se lee llamándolo como función: arregloJugadores()
  arregloJugadores = signal<Jugador[]>([]);
  ganadores = signal<Jugador[]>([]);
  numerosGanadores = signal<number[]>([]);

  // Controla qué sección se ve: solo una a la vez.
  vista = signal<'balotas' | 'jugadores'>('balotas');

  // computed = valor derivado que se recalcula solo cuando cambian los
  // signals de los que depende (aquí, numerosGanadores).
  numeroWin = computed(() => {
    const numeros = this.numerosGanadores();
    return numeros.length
      ? `El número ganador es: ${numeros.join(' ')}`
      : '';
  });

  // Se ejecuta cuando <app-jugadores> emite su output "jugadoresListos".
  // Así App no necesita crear su propia copia de los jugadores: usa la
  // misma lista que ya vive dentro del componente Jugadores.
  onJugadoresListos(jugadores: Jugador[]): void {
    this.arregloJugadores.set(jugadores);
  }

  playLoteria(): void {
    // Antes el máximo era 9, pero hay jugadores con número 12 que nunca
    // podrían salir sorteados. Subimos el rango a 20 para que todos
    // tengan posibilidad real de ganar. Ajusta este número si lo necesitas.
    this.numerosGanadores.set(this.generarNumerosUnicos(5, 20));
    this.ganadores.set([]); // cada nueva jugada invalida a los ganadores anteriores
    this.vista.set('balotas');
  }

  // Botón 2 del reto: identifica y muestra a los jugadores ganadores.
  identificarGanadores(): void {
    const numeros = this.numerosGanadores();
    const encontrados = this.arregloJugadores().filter((jugador) =>
      jugador.jugoNumero(numeros)
    );
    this.ganadores.set(encontrados);
    this.vista.set('jugadores');
  }

  // Genera 5 números distintos entre 1 y max (como balotas reales, que no se repiten).
  private generarNumerosUnicos(cantidad: number, max: number): number[] {
    const numeros = new Set<number>();
    while (numeros.size < cantidad) {
      numeros.add(Math.trunc(Math.random() * max) + 1);
    }
    return Array.from(numeros);
  }
}
