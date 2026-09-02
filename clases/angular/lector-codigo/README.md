# Lector de códigos

App móvil híbrida (Angular + Capacitor) que lee **códigos QR** y **códigos de barras**
usando la cámara del celular.

## Cómo funciona

La app tiene dos pantallas, cada una en su propio componente:

| Pantalla | Componente | Formatos |
| --- | --- | --- |
| QR | `src/app/components/codigo-qr` | QR |
| Barras | `src/app/components/codigo-barras` | EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, Codabar, ITF |

Las dos comparten la cámara a través de `src/app/components/lector` y de
`src/app/services/escaner.ts`, que elige el motor de lectura según dónde corra la app:

- **En el celular** usa el plugin nativo `@capacitor-mlkit/barcode-scanning` (ML Kit de Google).
- **En el navegador** usa `@zxing/browser` sobre `getUserMedia`, para poder probar con `ng serve`.

## Correr en el navegador

```bash
npm start
```

Abre `http://localhost:4200`. El navegador pedirá permiso de cámara.

## Correr en el celular con Android Studio

1. Conecta el celular por USB con la **depuración USB** activada
   (Ajustes → Opciones de desarrollador).
2. Compila, sincroniza y abre el proyecto nativo:

```bash
npm run android
```

3. En Android Studio elige tu dispositivo en la barra superior y presiona **Run**.

Cada vez que cambies código de Angular hay que volver a copiar la web al proyecto nativo:

```bash
npm run sync
```

## Pruebas

```bash
npm test
```
