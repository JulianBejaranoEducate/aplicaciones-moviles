import { Component } from '@angular/core';
import { Son } from '../son/son';

@Component({
  selector: 'app-father',
  imports: [Son],
  templateUrl: './father.html',
  styleUrl: './father.css',
})
export class Father {
  //mensaje del padre al hijo
 public readonly MSN_INIT: string = "Hola hijo como vas";
 //propiedad para almacenar la respuesta o mensaje del hijo
 public message_received: string = "";
 public receivedEvent(evento:string):void{
  this.message_received = evento;
 } 
}
