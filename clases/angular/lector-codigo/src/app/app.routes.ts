import { Routes } from '@angular/router';
import { CodigoBarras } from './components/codigo-barras/codigo-barras';
import { CodigoQr } from './components/codigo-qr/codigo-qr';

export const routes: Routes = [
  { path: '', redirectTo: 'qr', pathMatch: 'full' },
  { path: 'qr', component: CodigoQr, title: 'Lector QR' },
  { path: 'barras', component: CodigoBarras, title: 'Lector de código de barras' },
  { path: '**', redirectTo: 'qr' },
];
