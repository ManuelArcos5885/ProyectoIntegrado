import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposSeleccionadoEstadioComponent } from './equipos-seleccionado-estadio.component';

describe('EquiposSeleccionadoEstadioComponent', () => {
  let component: EquiposSeleccionadoEstadioComponent;
  let fixture: ComponentFixture<EquiposSeleccionadoEstadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquiposSeleccionadoEstadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposSeleccionadoEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
