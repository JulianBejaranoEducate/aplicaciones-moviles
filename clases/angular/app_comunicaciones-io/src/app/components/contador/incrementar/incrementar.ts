import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementar',
  imports: [],
  templateUrl: './incrementar.html',
  styleUrl: './incrementar.css',
})
export class Incrementar {
  
  @Input()
  public contador: number = 0;

  @Output()
  public cambioContador: EventEmitter<number> = new EventEmitter<number>();

  public incrementar(): void {
    const nuevoValor: number = this.contador + 1;
    this.cambioContador.emit(nuevoValor);
  }
}
