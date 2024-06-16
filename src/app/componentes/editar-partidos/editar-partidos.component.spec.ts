import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPartidosComponent } from './editar-partidos.component';

describe('EditarPartidosComponent', () => {
  let component: EditarPartidosComponent;
  let fixture: ComponentFixture<EditarPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPartidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
