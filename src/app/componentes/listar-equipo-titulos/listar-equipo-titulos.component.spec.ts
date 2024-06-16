import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEquipoTitulosComponent } from './listar-equipo-titulos.component';

describe('ListarEquipoTitulosComponent', () => {
  let component: ListarEquipoTitulosComponent;
  let fixture: ComponentFixture<ListarEquipoTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarEquipoTitulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarEquipoTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
