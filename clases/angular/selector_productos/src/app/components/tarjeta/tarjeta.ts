import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  imports: [DecimalPipe],
  selector: 'app-tarjeta',
  styleUrl: './tarjeta.css',
  templateUrl: './tarjeta.html',
})
export class Tarjeta {

  public readonly producto = input.required<Producto>();

  public readonly activo = input<boolean>(false);

  public readonly seleccionado = output<Producto>();

  public seleccionar(): void {
    this.seleccionado.emit(this.producto());
  }

}
