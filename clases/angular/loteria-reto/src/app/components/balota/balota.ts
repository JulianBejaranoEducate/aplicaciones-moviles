import { Component, input} from '@angular/core';

@Component({
  selector: 'app-balota',
  imports: [],
  templateUrl: './balota.html',
  styleUrl: './balota.css',
})
export class Balota {

  valor = input<number>(0);

}
