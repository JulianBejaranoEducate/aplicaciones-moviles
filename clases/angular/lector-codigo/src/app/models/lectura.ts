/** Tipo de pantalla que originó la lectura. */
export type TipoLectura = 'qr' | 'barras';

/** Una lectura hecha con la cámara. */
export interface Lectura {
  /** Contenido leído del código. */
  valor: string;
  /** Formato detectado, tal como lo reporta el motor (QR_CODE, EAN_13, ...). */
  formato: string;
  /** Pantalla desde la que se leyó. */
  tipo: TipoLectura;
  /** Fecha de la lectura en formato ISO. */
  fecha: string;
}

/** Clasificación del contenido de un código QR. */
export interface ContenidoQr {
  clase: 'enlace' | 'correo' | 'telefono' | 'wifi' | 'texto';
  etiqueta: string;
  /** URL lista para abrir, cuando el contenido lo permite. */
  enlace?: string;
}

const NOMBRES_FORMATO: Record<string, string> = {
  QR_CODE: 'QR',
  AZTEC: 'Aztec',
  DATA_MATRIX: 'Data Matrix',
  PDF_417: 'PDF417',
  EAN_13: 'EAN-13',
  EAN_8: 'EAN-8',
  UPC_A: 'UPC-A',
  UPC_E: 'UPC-E',
  CODE_39: 'Code 39',
  CODE_93: 'Code 93',
  CODE_128: 'Code 128',
  CODABAR: 'Codabar',
  ITF: 'ITF',
};

/** Convierte el formato técnico en un nombre legible. */
export function nombreFormato(formato: string): string {
  return NOMBRES_FORMATO[formato] ?? formato.replace(/_/g, ' ');
}

/** Identifica qué tipo de contenido trae un código QR para ofrecer la acción adecuada. */
export function clasificarContenido(valor: string): ContenidoQr {
  const texto = valor.trim();

  if (/^https?:\/\//i.test(texto)) {
    return { clase: 'enlace', etiqueta: 'Enlace web', enlace: texto };
  }

  if (/^www\./i.test(texto)) {
    return { clase: 'enlace', etiqueta: 'Enlace web', enlace: `https://${texto}` };
  }

  if (/^mailto:/i.test(texto)) {
    return { clase: 'correo', etiqueta: 'Correo electrónico', enlace: texto };
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
    return { clase: 'correo', etiqueta: 'Correo electrónico', enlace: `mailto:${texto}` };
  }

  if (/^tel:/i.test(texto)) {
    return { clase: 'telefono', etiqueta: 'Teléfono', enlace: texto };
  }

  if (/^\+?[\d\s()-]{7,}$/.test(texto)) {
    return { clase: 'telefono', etiqueta: 'Teléfono', enlace: `tel:${texto.replace(/\s/g, '')}` };
  }

  if (/^WIFI:/i.test(texto)) {
    return { clase: 'wifi', etiqueta: 'Red Wi-Fi' };
  }

  return { clase: 'texto', etiqueta: 'Texto' };
}
