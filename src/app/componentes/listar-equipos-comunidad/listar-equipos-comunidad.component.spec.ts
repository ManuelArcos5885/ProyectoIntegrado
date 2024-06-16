import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEquiposComunidadComponent } from './listar-equipos-comunidad.component';

describe('ListarEquiposComunidadComponent', () => {
  let component: ListarEquiposComunidadComponent;
  let fixture: ComponentFixture<ListarEquiposComunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarEquiposComunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarEquiposComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
