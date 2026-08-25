import { Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Producto } from '../../models/producto';

@Component({
  imports: [DecimalPipe, FormsModule],
  selector: 'app-resumen',
  styleUrl: './resumen.css',
  templateUrl: './resumen.html',
})
export class Resumen {

  public readonly producto = input.required<Producto>();

  public readonly cantidad = model.required<number>();

  public readonly limpiar = output<void>();

  public readonly total = computed<number>(
    () => this.producto().precio * this.cantidad()
  );

  public aumentar(): void {
    this.cantidad.update((valor) => Math.min(valor + 1, 20));
  }

  public disminuir(): void {
    this.cantidad.update((valor) => Math.max(valor - 1, 1));
  }

  public validarCantidad(): void {
    const valor: number = Number(this.cantidad());

    this.cantidad.set(
      Number.isFinite(valor) ? Math.min(Math.max(Math.trunc(valor), 1), 20) : 1
    );
  }
  
}
