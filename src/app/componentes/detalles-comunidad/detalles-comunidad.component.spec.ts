import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesComunidadComponent } from './detalles-comunidad.component';

describe('DetallesComunidadComponent', () => {
  let component: DetallesComunidadComponent;
  let fixture: ComponentFixture<DetallesComunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesComunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
