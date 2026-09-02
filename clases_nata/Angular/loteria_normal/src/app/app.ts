import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Balota } from './balota/balota';

@Component({
  imports: [RouterOutlet, Balota],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
number1: number;
number2: number;
number3: number;
number4: number;
number5: number;
numberWin: string;

constructor(){
  this.number1=0;
  this.number2=0;
  this.number3=0;
  this.number4=0;
  this.number5=0;
  this.numberWin="";
}

getNumberPlaying(): number{
  let myNumber : number;
  myNumber = (Math.trunc(Math.random() * 9)-1) + (1);
  if (myNumber < 0) myNumber=0;
  return myNumber;
}

playLotery():void{
  this.number1= this.getNumberPlaying();
  this.number2= this.getNumberPlaying();
  this.number3= this.getNumberPlaying();
  this.number4= this.getNumberPlaying();
  this.number5= this.getNumberPlaying();
  this.numberWin = `El número ganador es: ${this.number1} ${this.number2} ${this.number3} ${this.number4} ${this.number5}`;
}
}
