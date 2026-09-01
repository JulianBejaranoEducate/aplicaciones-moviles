import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contenedor } from './contenedor';

describe('Contenedor', () => {
  let component: Contenedor;
  let fixture: ComponentFixture<Contenedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contenedor],
    }).compileComponents();

    fixture = TestBed.createComponent(Contenedor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
