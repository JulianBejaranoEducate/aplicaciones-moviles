
import { Component, signal } from '@angular/core';
import { Producto } from '../producto.model';
import { TarjetaProducto} from '../tarjeta-producto/tarjeta-producto';
import { ResumenCompra } from '../resumen-compra/resumen-compra';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    ResumenCompra,
    TarjetaProducto
  ],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  productos = signal<Producto[]>([
    {
      id: 1,
      nombre: 'Audífonos por bluetooth',
      precio: 120000,
      descripcion: 'Cancelación activa de ruido'
    },
    {
      id: 2,
      nombre: 'Teclado Mecánico',
      precio: 85000,
      descripcion: 'Switches táctiles '
    },
    {
      id: 3,
      nombre: 'Monitor 27 pulgadas 4K',
      precio: 650000,
      descripcion: 'Panel de alta resolución'
    }
  ]);

  productoSeleccionado = signal<Producto | null>(null);

  cantidad = signal<number>(1);

  alSeleccionar(producto: Producto): void {
    this.productoSeleccionado.set(producto);
    this.cantidad.set(1);
  }
}


