import { clasificarContenido, nombreFormato } from './lectura';

describe('nombreFormato', () => {
  it('traduce los formatos técnicos a nombres legibles', () => {
    expect(nombreFormato('QR_CODE')).toBe('QR');
    expect(nombreFormato('EAN_13')).toBe('EAN-13');
    expect(nombreFormato('CODE_128')).toBe('Code 128');
  });

  it('deja pasar un formato desconocido sin guiones bajos', () => {
    expect(nombreFormato('OTRO_FORMATO')).toBe('OTRO FORMATO');
  });
});

describe('clasificarContenido', () => {
  it('reconoce enlaces web', () => {
    expect(clasificarContenido('https://uniempresarial.edu.co')).toEqual({
      clase: 'enlace',
      etiqueta: 'Enlace web',
      enlace: 'https://uniempresarial.edu.co',
    });
  });

  it('completa el protocolo de un enlace que empieza en www', () => {
    expect(clasificarContenido('www.google.com').enlace).toBe('https://www.google.com');
  });

  it('reconoce correos y les arma el mailto', () => {
    expect(clasificarContenido('julian@correo.com').enlace).toBe('mailto:julian@correo.com');
  });

  it('reconoce teléfonos', () => {
    expect(clasificarContenido('+57 300 123 4567').clase).toBe('telefono');
  });

  it('reconoce redes wifi', () => {
    expect(clasificarContenido('WIFI:S:MiRed;T:WPA;P:clave;;').clase).toBe('wifi');
  });

  it('cualquier otra cosa queda como texto', () => {
    expect(clasificarContenido('Hola mundo').clase).toBe('texto');
  });
});
