import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-son',
  imports: [],
  templateUrl: './son.html',
  styleUrl: './son.css',
})
export class Son {

  //atributo que recibe informacion del componente padre
  @Input()
  public message:string="";


  //Evento que permite enviar informacion al componente padre
  @Output()
  public notification: EventEmitter<string> = new EventEmitter<string>();

  // Método que se llama para notificar al componente padre
  public sendEvent():void{
    this.notification.emit("Hola pa");
  }


}
