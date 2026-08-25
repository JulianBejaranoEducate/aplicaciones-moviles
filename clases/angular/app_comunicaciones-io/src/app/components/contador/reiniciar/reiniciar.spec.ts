import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reiniciar } from './reiniciar';

describe('Reiniciar', () => {
  let component: Reiniciar;
  let fixture: ComponentFixture<Reiniciar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reiniciar],
    }).compileComponents();

    fixture = TestBed.createComponent(Reiniciar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
