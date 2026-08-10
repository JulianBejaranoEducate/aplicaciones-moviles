import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-son',
  imports: [],
  templateUrl: './son.html',
  styleUrl: './son.css',
})
export class Son {

  // Atributo que recibe información del componente padre [Father]
  @Input()
  public message: string = '';

  // Evento que permite enviar al padre información
  @Output()
  public notification: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Método que envía el mensaje del componente hijo [Son] al componente padre [Father]
   */
  public sendEvent(): void {
    this.notification.emit("Hola padre");
  }

}
