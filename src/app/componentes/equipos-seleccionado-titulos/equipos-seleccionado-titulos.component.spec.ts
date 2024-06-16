import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposSeleccionadoTitulosComponent } from './equipos-seleccionado-titulos.component';

describe('EquiposSeleccionadoTitulosComponent', () => {
  let component: EquiposSeleccionadoTitulosComponent;
  let fixture: ComponentFixture<EquiposSeleccionadoTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquiposSeleccionadoTitulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposSeleccionadoTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
