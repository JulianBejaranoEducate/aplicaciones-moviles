import { Component, input, output, computed } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-escaner',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './escaner.html',
  styleUrl: './escaner.css'
})
export class EscanerComponent {
  modo = input.required<'qr' | 'barras'>();
  resultado = input<string>('');

  alEscanear = output<string>();
  alVolver = output<void>();

  formatos = computed(() => {
    return this.modo() === 'qr' 
      ? [BarcodeFormat.QR_CODE] 
      : [BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
  });

  onCodeResult(codigo: string): void {
    this.alEscanear.emit(codigo);
  }
}