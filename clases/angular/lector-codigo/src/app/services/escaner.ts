import { Injectable } from '@angular/core';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { BarcodeFormat, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import type { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

/** Configuración con la que una pantalla arranca el escáner. */
export interface OpcionesEscaneo {
  /** Formatos que se van a buscar (solo QR, o solo códigos de barras). */
  formatos: BarcodeFormat[];
  /** Elemento de video usado únicamente cuando corremos en navegador. */
  video: HTMLVideoElement;
  /** Se llama con el primer código detectado. */
  alLeer: (valor: string, formato: string) => void;
}

/**
 * Único punto de acceso a la cámara de la app.
 *
 * En el celular usa el plugin nativo de ML Kit (rápido y preciso) y en el
 * navegador usa ZXing sobre getUserMedia, para poder probar con `ng serve`.
 *
 * Los valores del enum de formatos de ML Kit ('QR_CODE', 'EAN_13', ...) coinciden
 * con los nombres del enum de ZXing, así que la equivalencia entre motores es directa.
 */
@Injectable({ providedIn: 'root' })
export class EscanerService {

  /** true cuando la app corre dentro de Android/iOS por medio de Capacitor. */
  readonly esNativo = Capacitor.isNativePlatform();

  private manejadorLectura?: PluginListenerHandle;
  private lectorWeb?: BrowserMultiFormatReader;
  private controlesWeb?: IScannerControls;
  private activo = false;
  private linternaEncendida = false;
  /** Identifica el encendido actual de la cámara para descartar respuestas viejas. */
  private sesion = 0;

  /** Enciende la cámara y empieza a buscar códigos. */
  async iniciar(opciones: OpcionesEscaneo): Promise<void> {
    await this.detener();
    const sesion = ++this.sesion;

    try {
      if (this.esNativo) {
        await this.iniciarNativo(opciones, sesion);
      } else {
        await this.iniciarWeb(opciones, sesion);
      }
      this.activo = sesion === this.sesion;
    } catch (error) {
      await this.detener();
      throw new Error(this.mensajeDeError(error));
    }
  }

  /** Apaga la cámara y libera todos los recursos. */
  async detener(): Promise<void> {
    this.activo = false;
    this.linternaEncendida = false;
    // Al cambiar de sesión, cualquier arranque que siga en curso se cancela solo.
    this.sesion++;

    if (this.esNativo) {
      document.body.classList.remove('escaner-activo');
      await this.manejadorLectura?.remove().catch(() => undefined);
      this.manejadorLectura = undefined;
      await BarcodeScanner.stopScan().catch(() => undefined);
      return;
    }

    this.controlesWeb?.stop();
    this.controlesWeb = undefined;
    this.lectorWeb = undefined;
  }

  /** Indica si el dispositivo actual permite encender la linterna. */
  async linternaDisponible(): Promise<boolean> {
    if (!this.activo) {
      return false;
    }

    if (this.esNativo) {
      const { available } = await BarcodeScanner.isTorchAvailable().catch(() => ({ available: false }));
      return available;
    }

    return typeof this.controlesWeb?.switchTorch === 'function';
  }

  /** Prende o apaga la linterna y devuelve el estado en el que quedó. */
  async alternarLinterna(): Promise<boolean> {
    this.linternaEncendida = !this.linternaEncendida;

    if (this.esNativo) {
      await BarcodeScanner.toggleTorch();
    } else {
      await this.controlesWeb?.switchTorch?.(this.linternaEncendida);
    }

    return this.linternaEncendida;
  }

  // ----- Celular: plugin nativo de ML Kit -----

  private async iniciarNativo({ formatos, alLeer }: OpcionesEscaneo, sesion: number): Promise<void> {
    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      throw new Error('Este dispositivo no soporta el escáner de códigos.');
    }

    const permisos = await BarcodeScanner.requestPermissions();
    if (permisos.camera !== 'granted' && permisos.camera !== 'limited') {
      throw new Error('Necesitamos permiso de cámara para poder escanear.');
    }

    this.manejadorLectura = await BarcodeScanner.addListener('barcodesScanned', (evento) => {
      const codigo = evento.barcodes[0];
      if (codigo && sesion === this.sesion) {
        alLeer(codigo.displayValue || codigo.rawValue || '', codigo.format);
      }
    });

    // La cámara nativa se dibuja DETRÁS del WebView: hay que dejarlo transparente.
    document.body.classList.add('escaner-activo');

    await BarcodeScanner.startScan({ formats: formatos, lensFacing: LensFacing.Back });

    // La cámara puede tardar en abrir: si mientras tanto ya nos detuvieron, cerramos.
    if (sesion !== this.sesion) {
      await BarcodeScanner.stopScan().catch(() => undefined);
      document.body.classList.remove('escaner-activo');
    }
  }

  // ----- Navegador: ZXing sobre getUserMedia -----

  private async iniciarWeb({ formatos, video, alLeer }: OpcionesEscaneo, sesion: number): Promise<void> {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Este navegador no permite usar la cámara.');
    }

    // ZXing solo hace falta en el navegador: se carga aparte para no cargarlo en el celular.
    const [{ BrowserMultiFormatReader: LectorZXing }, { BarcodeFormat: FormatoZXing, DecodeHintType }] =
      await Promise.all([import('@zxing/browser'), import('@zxing/library')]);

    const pistas = new Map<number, unknown>();
    pistas.set(
      DecodeHintType.POSSIBLE_FORMATS,
      formatos.map((formato) => FormatoZXing[formato as keyof typeof FormatoZXing]),
    );
    pistas.set(DecodeHintType.TRY_HARDER, true);

    const lector = new LectorZXing(pistas as never, { delayBetweenScanAttempts: 120 });

    const controles = await lector.decodeFromConstraints(
      { video: { facingMode: { ideal: 'environment' } } },
      video,
      (resultado) => {
        // ZXing reporta un error en cada cuadro sin código: solo nos interesa el resultado.
        if (resultado && sesion === this.sesion) {
          alLeer(resultado.getText(), FormatoZXing[resultado.getBarcodeFormat()]);
        }
      },
    );

    // La cámara puede tardar en abrir: si mientras tanto ya nos detuvieron, cerramos.
    if (sesion !== this.sesion) {
      controles.stop();
      return;
    }

    this.lectorWeb = lector;
    this.controlesWeb = controles;
  }

  private mensajeDeError(error: unknown): string {
    const nombre = (error as { name?: string })?.name ?? '';
    const mensaje = (error as { message?: string })?.message ?? '';

    if (nombre === 'NotAllowedError' || /denied|permission/i.test(mensaje)) {
      return 'No diste permiso para usar la cámara. Habilítalo e intenta de nuevo.';
    }

    if (nombre === 'NotFoundError' || nombre === 'OverconstrainedError') {
      return 'No encontramos una cámara disponible en este dispositivo.';
    }

    return mensaje || 'No pudimos iniciar la cámara.';
  }
}
