import { Component, computed, inject, signal } from '@angular/core';
import { BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { clasificarContenido, Lectura, nombreFormato } from '../../models/lectura';
import { copiarTexto } from '../../services/portapapeles';
import { LecturasService } from '../../services/lecturas';
import { Lector, LecturaDetectada } from '../lector/lector';

/** Pantalla dedicada a la lectura de códigos QR. */
@Component({
  imports: [Lector],
  selector: 'app-codigo-qr',
  styleUrl: './codigo-qr.css',
  templateUrl: './codigo-qr.html',
})
export class CodigoQr {

  private readonly lecturas = inject(LecturasService);

  /** En esta pantalla la cámara solo busca códigos QR. */
  readonly formatos = [BarcodeFormat.QrCode];

  readonly ultima = signal<Lectura | null>(null);
  readonly copiado = signal(false);

  /** Identifica si el QR trae un enlace, un correo, un teléfono, etc. */
  readonly contenido = computed(() => {
    const lectura = this.ultima();
    return lectura ? clasificarContenido(lectura.valor) : null;
  });

  readonly historial = computed(() =>
    this.lecturas.lecturas().filter((lectura) => lectura.tipo === 'qr'),
  );

  alLeer({ valor, formato }: LecturaDetectada): void {
    const lectura: Lectura = { valor, formato, tipo: 'qr', fecha: new Date().toISOString() };
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

  abrir(): void {
    const enlace = this.contenido()?.enlace;
    if (enlace) {
      window.open(enlace, '_blank');
    }
  }

  limpiar(): void {
    this.lecturas.limpiar('qr');
    this.ultima.set(null);
  }

  nombre(formato: string): string {
    return nombreFormato(formato);
  }

  fecha(iso: string): string {
    return new Date(iso).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
  }
}
