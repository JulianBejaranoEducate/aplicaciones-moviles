import { Component, ElementRef, inject, input, OnDestroy, output, signal, viewChild } from '@angular/core';
import { BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { EscanerService } from '../../services/escaner';

/** Lectura entregada por el componente a la pantalla que lo usa. */
export interface LecturaDetectada {
  valor: string;
  formato: string;
}

/**
 * Cámara reutilizable por las dos pantallas.
 *
 * Solo se encarga de mostrar la cámara y detectar un código; la pantalla que lo
 * use decide qué hacer con el resultado.
 */
@Component({
  imports: [],
  selector: 'app-lector',
  styleUrl: './lector.css',
  templateUrl: './lector.html',
})
export class Lector implements OnDestroy {

  /** Formatos que debe buscar la cámara. */
  formatos = input.required<BarcodeFormat[]>();
  /** Texto de ayuda que se muestra sobre la cámara. */
  ayuda = input('Centra el código dentro del marco');
  /** Texto del botón que abre la cámara. */
  etiquetaBoton = input('Escanear');

  /** Se emite con el primer código detectado. */
  leido = output<LecturaDetectada>();

  private readonly escaner = inject(EscanerService);
  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private procesando = false;

  readonly esNativo = this.escaner.esNativo;
  readonly escaneando = signal(false);
  readonly iniciando = signal(false);
  readonly error = signal('');
  readonly hayLinterna = signal(false);
  readonly linterna = signal(false);

  async iniciar(): Promise<void> {
    if (this.escaneando() || this.iniciando()) {
      return;
    }

    this.error.set('');
    this.iniciando.set(true);
    this.procesando = false;

    try {
      await this.escaner.iniciar({
        formatos: this.formatos(),
        video: this.video().nativeElement,
        alLeer: (valor, formato) => this.registrar(valor, formato),
      });

      // Si el código se leyó mientras la cámara terminaba de abrir, ya no hay nada que mostrar.
      if (this.procesando) {
        await this.detener();
        return;
      }

      this.escaneando.set(true);
      this.hayLinterna.set(await this.escaner.linternaDisponible());
    } catch (error) {
      this.error.set((error as Error).message);
      this.escaneando.set(false);
    } finally {
      this.iniciando.set(false);
    }
  }

  async detener(): Promise<void> {
    await this.escaner.detener();
    this.escaneando.set(false);
    this.linterna.set(false);
    this.hayLinterna.set(false);
  }

  async alternarLinterna(): Promise<void> {
    try {
      this.linterna.set(await this.escaner.alternarLinterna());
    } catch {
      this.hayLinterna.set(false);
    }
  }

  ngOnDestroy(): void {
    void this.escaner.detener();
  }

  /** Toma el primer código detectado, apaga la cámara y avisa a la pantalla. */
  private registrar(valor: string, formato: string): void {
    if (this.procesando || !valor) {
      return;
    }

    this.procesando = true;
    void this.detener();
    this.leido.emit({ valor, formato });
  }
}
