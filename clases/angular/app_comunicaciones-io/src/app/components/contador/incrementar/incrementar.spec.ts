import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Incrementar } from './incrementar';

describe('Incrementar', () => {
  let component: Incrementar;
  let fixture: ComponentFixture<Incrementar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Incrementar],
    }).compileComponents();

    fixture = TestBed.createComponent(Incrementar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
