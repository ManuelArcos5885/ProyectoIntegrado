import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirUsuariosComponent } from './elegir-usuarios.component';

describe('ElegirUsuariosComponent', () => {
  let component: ElegirUsuariosComponent;
  let fixture: ComponentFixture<ElegirUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElegirUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegirUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
