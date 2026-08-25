import { Component } from '@angular/core';
import { Son } from '../son/son';

@Component({
  selector: 'app-father',
  imports: [Son],
  templateUrl: './father.html',
  styleUrl: './father.css',
})
export class Father {

  // Mensaje del componente padre [Father] al componente hijo [Son]
  public readonly MSN_INIT: string = 'Hola hijo, como vas?'

  // Propiedad para almacenar la respuesta o mensaje del componente hijo [Son]
  public message_received: string = '';

  public receivedEvent(evento:string): void {
    this.message_received = evento;
  }
}
