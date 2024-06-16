import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEstadioComponent } from './detalles-estadio.component';

describe('DetallesEstadioComponent', () => {
  let component: DetallesEstadioComponent;
  let fixture: ComponentFixture<DetallesEstadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesEstadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
