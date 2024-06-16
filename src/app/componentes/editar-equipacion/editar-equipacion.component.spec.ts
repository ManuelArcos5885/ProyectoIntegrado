import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipacionComponent } from './editar-equipacion.component';

describe('EditarEquipacionComponent', () => {
  let component: EditarEquipacionComponent;
  let fixture: ComponentFixture<EditarEquipacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEquipacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEquipacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
