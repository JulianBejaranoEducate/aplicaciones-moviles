import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-decrementar',
  imports: [],
  templateUrl: './decrementar.html',
  styleUrl: './decrementar.css',
})
export class Decrementar {

  @Input()
  public contador: number = 0;

  @Output()
  public cambioContador: EventEmitter<number> = new EventEmitter<number>();

  public decrementar(): void {
    if (this.contador <= 0) {
      return;
    }

    const nuevoValor: number = this.contador - 1;
    this.cambioContador.emit(nuevoValor);
  }
}
