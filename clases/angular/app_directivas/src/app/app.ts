import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Swiche } from "./componets/swiche/swiche";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Swiche, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected qualification:number;

  constructor() {
    this.qualification = -1;
  }
}
