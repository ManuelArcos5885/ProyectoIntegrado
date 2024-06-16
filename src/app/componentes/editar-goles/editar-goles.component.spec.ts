import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGolesComponent } from './editar-goles.component';

describe('EditarGolesComponent', () => {
  let component: EditarGolesComponent;
  let fixture: ComponentFixture<EditarGolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarGolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarGolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
