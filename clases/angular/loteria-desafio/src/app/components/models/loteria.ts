export class Loteria {
  private numeros: number[] = [0, 0, 0, 0, 0];

  jugar(): number[] {
    this.numeros = this.numeros.map(() => this.generarNumero());
    return this.numeros;
  }

  getNumeros(): number[] {
    return this.numeros;
  }

  private generarNumero(): number {
    return Math.trunc(Math.random() * 9);
  }
}