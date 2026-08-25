import { Component, input, output } from '@angular/core';

// Este componente hacer referencia a [Decrementar]

@Component({
  selector: 'app-son',
  imports: [],
  templateUrl: './son.html',
  styleUrl: './son.css',
})
export class Son {
  valor = input.required<number>();
  valorDecrementado = output<number>();

  decremetar(): void {
    this.valorDecrementado.emit(this.valor() - 1);
  }
}
