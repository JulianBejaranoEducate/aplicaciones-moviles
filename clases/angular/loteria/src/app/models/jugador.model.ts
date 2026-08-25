
// Su única responsabilidad es representar a un jugador.
export class Jugador {
  constructor(
    public nombres: string,
    public apellidos: string,
    public numeroJugado: number
  ) {}

  /** Nombre  para mostrar en pantalla. */
  get nombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }

  /**
   * El propio jugador decide si ganó, comparando su número contra
   * los números sorteados.
   */
  jugoNumero(numerosGanadores: number[]): boolean {
    return numerosGanadores.includes(this.numeroJugado);
  }
}
