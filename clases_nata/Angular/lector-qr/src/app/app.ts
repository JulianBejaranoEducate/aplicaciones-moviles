import { Component, signal } from '@angular/core';
import { MenuComponent } from './components/menu/menu';
import { EscanerComponent } from './components/escaner/escaner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, EscanerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  pantallaActual = signal<'menu' | 'qr' | 'barras'>('menu');
  codigoDetectado = signal<string>('');

  seleccionarModo(modo: 'qr' | 'barras'): void {
    this.pantallaActual.set(modo);
    this.codigoDetectado.set('');
  }

  guardarResultado(codigo: string): void {
    this.codigoDetectado.set(codigo);
  }

  volverAlMenu(): void {
    this.pantallaActual.set('menu');
    this.codigoDetectado.set('');
  }
}