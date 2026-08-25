import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reiniciar',
  imports: [],
  templateUrl: './reiniciar.html',
  styleUrl: './reiniciar.css',
})
export class Reiniciar {

  @Input()
  public contador: number = 0;

  @Input()
  public valorInicial: number = 10;

  @Output()
  public cambioContador: EventEmitter<number> = new EventEmitter<number>();

  public reiniciar(): void {
    this.cambioContador.emit(this.valorInicial);
  }
}
