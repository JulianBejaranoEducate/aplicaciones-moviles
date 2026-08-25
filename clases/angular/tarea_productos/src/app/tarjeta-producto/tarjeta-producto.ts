
import { Component, input, output } from '@angular/core';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-tarjeta-producto',
  imports: [],
  standalone: true,
  templateUrl: './tarjeta-producto.html',
  styleUrl: './tarjeta-producto.css',
})
export class TarjetaProducto {

  producto = input.required<Producto>();

  seleccionado = output<Producto>();
}


