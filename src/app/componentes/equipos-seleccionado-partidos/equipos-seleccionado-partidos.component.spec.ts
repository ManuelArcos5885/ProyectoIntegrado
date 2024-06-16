import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposSeleccionadoPartidosComponent } from './equipos-seleccionado-partidos.component';

describe('EquiposSeleccionadoPartidosComponent', () => {
  let component: EquiposSeleccionadoPartidosComponent;
  let fixture: ComponentFixture<EquiposSeleccionadoPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquiposSeleccionadoPartidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposSeleccionadoPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
