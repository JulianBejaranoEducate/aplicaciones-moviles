import { Component, signal } from '@angular/core';
import { Producto } from '../../models/producto';
import { Tarjeta } from '../tarjeta/tarjeta';
import { Resumen } from '../resumen/resumen';

@Component({
  imports: [Tarjeta, Resumen],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {

   public readonly productos = signal<Producto[]>([
    {
      id: 1,
      nombre: 'Teclado mecánico',
      categoria: 'Periféricos',
      precio: 249900,
      descripcion: 'Switches rojos, retroiluminación RGB y distribución en español.',
    },
    {
      id: 2,
      nombre: 'Mouse inalámbrico',
      categoria: 'Periféricos',
      precio: 129900,
      descripcion: 'Sensor óptico de 16.000 DPI y batería de hasta 70 horas.',
    },
    {
      id: 3,
      nombre: 'Monitor 27" QHD',
      categoria: 'Pantallas',
      precio: 1149000,
      descripcion: 'Panel IPS de 2560x1440 a 165 Hz con altura ajustable.',
    },
    {
      id: 4,
      nombre: 'Audífonos over-ear',
      categoria: 'Audio',
      precio: 389900,
      descripcion: 'Cancelación activa de ruido y conexión multipunto.',
    },
  ]);

  public readonly productoSeleccionado = signal<Producto | null>(null);

  public readonly cantidad = signal<number>(1);

  public seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado.set(producto);
    this.cantidad.set(1);
  }

  public limpiarSeleccion(): void {
    this.productoSeleccionado.set(null);
    this.cantidad.set(1);
  }
}
