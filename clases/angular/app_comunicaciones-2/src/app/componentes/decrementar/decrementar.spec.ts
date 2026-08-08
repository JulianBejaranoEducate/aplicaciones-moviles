import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decrementar } from './decrementar';

describe('Decrementar', () => {
  let component: Decrementar;
  let fixture: ComponentFixture<Decrementar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decrementar],
    }).compileComponents();

    fixture = TestBed.createComponent(Decrementar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
