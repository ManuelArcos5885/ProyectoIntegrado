import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposSeleccionadoGolesComponent } from './equipos-seleccionado-goles.component';

describe('EquiposSeleccionadoGolesComponent', () => {
  let component: EquiposSeleccionadoGolesComponent;
  let fixture: ComponentFixture<EquiposSeleccionadoGolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquiposSeleccionadoGolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposSeleccionadoGolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
