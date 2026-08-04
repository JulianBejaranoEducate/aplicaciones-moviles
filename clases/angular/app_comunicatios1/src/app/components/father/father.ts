import { Component } from '@angular/core';
import { Son } from '../son/son';

@Component({
  selector: 'app-father',
  imports: [Son],
  templateUrl: './father.html',
  styleUrl: './father.css',
})
export class Father {
  //Mensaje del padre al hijo (father to son)
  public readonly MSN_INIT: string = 'Hola hijo, como estas';

  //Propiedad para almacenar la respuesta del hijo (son to father)
  public message_received: string = '';

  public receivedEvent(evento:string):void{
    this.message_received = evento;
  }
}
