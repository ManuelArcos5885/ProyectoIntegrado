import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstadioComponent } from './crear-estadio.component';

describe('CrearEstadioComponent', () => {
  let component: CrearEstadioComponent;
  let fixture: ComponentFixture<CrearEstadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEstadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
