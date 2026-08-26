import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Balota } from './balota';

describe('Balota', () => {
  let component: Balota;
  let fixture: ComponentFixture<Balota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Balota],
    }).compileComponents();

    fixture = TestBed.createComponent(Balota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
