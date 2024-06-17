import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstadioComponent } from './editar-estadio.component';

describe('EditarEstadioComponent', () => {
  let component: EditarEstadioComponent;
  let fixture: ComponentFixture<EditarEstadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEstadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
