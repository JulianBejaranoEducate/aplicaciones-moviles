import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-decrementar',
  imports: [],
  templateUrl: './decrementar.html',
  styleUrl: './decrementar.css',
})
export class Decrementar {
  valor = input.required<number>();
  valorCambiado = output<number>();

  decrementar(): void {
    this.valorCambiado.emit(this.valor() - 1);
  }
}
