import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-balota',
  styleUrl: './balota.css',
  templateUrl: './balota.html',
})
export class Balota {
  @Input()
  valor : number = 0;

}

