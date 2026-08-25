import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Balot } from './balot';

describe('Balot', () => {
  let component: Balot;
  let fixture: ComponentFixture<Balot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Balot],
    }).compileComponents();

    fixture = TestBed.createComponent(Balot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
