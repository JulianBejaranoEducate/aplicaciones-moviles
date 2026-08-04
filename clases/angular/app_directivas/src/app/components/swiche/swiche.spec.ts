import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Swiche } from './swiche';

describe('Swiche', () => {
  let component: Swiche;
  let fixture: ComponentFixture<Swiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Swiche],
    }).compileComponents();

    fixture = TestBed.createComponent(Swiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
