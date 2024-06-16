import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadEquipoComponent } from './ciudad-equipo.component';

describe('CiudadEquipoComponent', () => {
  let component: CiudadEquipoComponent;
  let fixture: ComponentFixture<CiudadEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CiudadEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
