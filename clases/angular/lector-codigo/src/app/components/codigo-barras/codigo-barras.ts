import { Component, computed, inject, signal } from '@angular/core';
import { BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Lectura, nombreFormato } from '../../models/lectura';
import { copiarTexto } from '../../services/portapapeles';
import { LecturasService } from '../../services/lecturas';
import { Lector, LecturaDetectada } from '../lector/lector';

/** Formatos de códigos de barras de una dimensión más usados en comercio. */
const FORMATOS_BARRAS = [
  BarcodeFormat.Ean13,
  BarcodeFormat.Ean8,
  BarcodeFormat.UpcA,
  BarcodeFormat.UpcE,
  BarcodeFormat.Code128,
  BarcodeFormat.Code39,
  BarcodeFormat.Code93,
  BarcodeFormat.Codabar,
  BarcodeFormat.Itf,
];

/** Pantalla dedicada a la lectura de códigos de barras. */
@Component({
  imports: [Lector],
  selector: 'app-codigo-barras',
  styleUrl: './codigo-barras.css',
  templateUrl: './codigo-barras.html',
})
export class CodigoBarras {

  private readonly lecturas = inject(LecturasService);

  readonly formatos = FORMATOS_BARRAS;

  readonly ultima = signal<Lectura | null>(null);
  readonly copiado = signal(false);

  readonly historial = computed(() =>
    this.lecturas.lecturas().filter((lectura) => lectura.tipo === 'barras'),
  );

  /** Los EAN/UPC son códigos de producto: ofrecemos buscarlo en internet. */
  readonly esProducto = computed(() => {
    const formato = this.ultima()?.formato ?? '';
    return formato.startsWith('EAN') || formato.startsWith('UPC');
  });

  alLeer({ valor, formato }: LecturaDetectada): void {
    const lectura: Lectura = { valor, formato, tipo: 'barras', fecha: new Date().toISOString() };
    this.ultima.set(lectura);
    this.copiado.set(false);
    this.lecturas.agregar(lectura);
  }

  async copiar(): Promise<void> {
    const lectura = this.ultima();
    if (!lectura) {
      return;
    }

    this.copiado.set(await copiarTexto(lectura.valor));
  }

  buscarProducto(): void {
    const lectura = this.ultima();
    if (lectura) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(lectura.valor)}`, '_blank');
    }
  }

  limpiar(): void {
    this.lecturas.limpiar('barras');
    this.ultima.set(null);
  }

  nombre(formato: string): string {
    return nombreFormato(formato);
  }

  fecha(iso: string): string {
    return new Date(iso).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
  }
}
