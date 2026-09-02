import { effect, Injectable, signal } from '@angular/core';
import { Lectura, TipoLectura } from '../models/lectura';

const CLAVE_ALMACENAMIENTO = 'lector-codigo:historial';
const MAXIMO_GUARDADO = 30;

/** Historial de códigos leídos, compartido por las dos pantallas. */
@Injectable({ providedIn: 'root' })
export class LecturasService {

  private readonly _lecturas = signal<Lectura[]>(this.recuperar());

  /** Historial completo, del más reciente al más antiguo. */
  readonly lecturas = this._lecturas.asReadonly();

  constructor() {
    // Cada cambio del historial se guarda en el dispositivo.
    effect(() => this.persistir(this._lecturas()));
  }

  /** Agrega una lectura al inicio del historial, evitando repetir la última. */
  agregar(lectura: Lectura): void {
    this._lecturas.update((lista) => {
      const anterior = lista[0];
      if (anterior?.valor === lectura.valor && anterior.tipo === lectura.tipo) {
        return lista;
      }
      return [lectura, ...lista].slice(0, MAXIMO_GUARDADO);
    });
  }

  /** Borra el historial de una sola pantalla. */
  limpiar(tipo: TipoLectura): void {
    this._lecturas.update((lista) => lista.filter((lectura) => lectura.tipo !== tipo));
  }

  private recuperar(): Lectura[] {
    try {
      const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
      return guardado ? (JSON.parse(guardado) as Lectura[]) : [];
    } catch {
      return [];
    }
  }

  private persistir(lecturas: Lectura[]): void {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(lecturas));
    } catch {
      // Si el almacenamiento no está disponible, el historial vive solo en memoria.
    }
  }
}
