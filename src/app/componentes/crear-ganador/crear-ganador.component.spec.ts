import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGanadorComponent } from './crear-ganador.component';

describe('CrearGanadorComponent', () => {
  let component: CrearGanadorComponent;
  let fixture: ComponentFixture<CrearGanadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearGanadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearGanadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
