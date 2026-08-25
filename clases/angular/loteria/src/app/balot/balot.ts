import { Component, input } from '@angular/core';

@Component({
  selector: 'app-balot',
  imports: [],
  templateUrl: './balot.html',
  styleUrl: './balot.css',
})
export class Balot {
  //  el padre le pasa el número que debe mostrar esta balota.
  valor = input<number>(0);
}
