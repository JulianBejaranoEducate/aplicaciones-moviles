import { Component, input, model } from '@angular/core';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-resumen-compra',
  imports: [],
  standalone: true,
  templateUrl: './resumen-compra.html',
  styleUrl: './resumen-compra.css',
})
export class ResumenCompra {
  producto = input<Producto | null>(null);

  cantidad = model.required<number>();

  aumentar(): void {
    this.cantidad.update(valor => Math.min(valor + 1, 10));
  }

  disminuir(): void {
    if (this.cantidad() > 1) {
      this.cantidad.update(valor => valor - 1);
    }
  }
}



