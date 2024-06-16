import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEquipoComponent } from './detalles-equipo.component';

describe('DetallesEquipoComponent', () => {
  let component: DetallesEquipoComponent;
  let fixture: ComponentFixture<DetallesEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
