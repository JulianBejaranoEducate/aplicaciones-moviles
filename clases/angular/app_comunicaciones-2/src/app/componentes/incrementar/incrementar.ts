import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-incrementar',
  imports: [],
  templateUrl: './incrementar.html',
  styleUrl: './incrementar.css',
})
export class Incrementar {
  valor = input.required<number>();
  valorCambiado = output<number>();

  incrementar(): void{
    this.valorCambiado.emit(this.valor() + 1);
  }
}
