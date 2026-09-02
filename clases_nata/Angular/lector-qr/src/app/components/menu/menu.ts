import { Component, output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  alSeleccionar = output<'qr' | 'barras'>();

  seleccionar(tipo: 'qr' | 'barras'): void {
    this.alSeleccionar.emit(tipo);
  }
}