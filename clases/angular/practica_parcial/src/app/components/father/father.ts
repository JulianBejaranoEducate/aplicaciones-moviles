import { Component, input, output } from '@angular/core';

// Este componente hacer referencia a [Incrementar]

@Component({
  selector: 'app-father',
  imports: [],
  templateUrl: './father.html',
  styleUrl: './father.css',
})
export class Father {
  valor = input.required<number>();
  valorIncrementdo = output<number>();

  incrementar(): void {
    this.valorIncrementdo.emit(this.valor() + 1);
  }
}
