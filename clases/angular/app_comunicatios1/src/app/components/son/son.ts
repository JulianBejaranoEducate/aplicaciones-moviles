import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-son',
  imports: [],
  templateUrl: './son.html',
  styleUrl: './son.css',
})
export class Son {
  //Atributo que recibe informacion del componente padre
  @Input()
  public message: string = '';

  //Evento que permite enviar al padre informacion del hijo
  @Output()
  public notification: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Metodo que envia el mensaje al componente padre
   */

  public sendEvent(): void {
    this.notification.emit('Hola papá');
  }

}
