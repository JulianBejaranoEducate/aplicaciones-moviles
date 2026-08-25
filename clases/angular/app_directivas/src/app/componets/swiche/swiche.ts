import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-swiche',
  imports: [FormsModule, CommonModule],
  templateUrl: './swiche.html',
  styleUrl: './swiche.css',
})
export class Swiche {
  protected status : 'aprobado' | 'rechazado' | 'pendiente';

  constructor() {
    this.status = 'pendiente';
  } 

}
