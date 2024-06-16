import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposSeleccionadoEquipacionComponent } from './equipos-seleccionado-equipacion.component';

describe('EquiposSeleccionadoEquipacionComponent', () => {
  let component: EquiposSeleccionadoEquipacionComponent;
  let fixture: ComponentFixture<EquiposSeleccionadoEquipacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquiposSeleccionadoEquipacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposSeleccionadoEquipacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
