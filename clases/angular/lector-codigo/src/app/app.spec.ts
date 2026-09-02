import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('crea la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el encabezado y las dos pestañas', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const contenido = fixture.nativeElement as HTMLElement;
    expect(contenido.querySelector('h1')?.textContent).toContain('Lector de códigos');
    expect(contenido.querySelectorAll('.pestanas__opcion').length).toBe(2);
  });
});
