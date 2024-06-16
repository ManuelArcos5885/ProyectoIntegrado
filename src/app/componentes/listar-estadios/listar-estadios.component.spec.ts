import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstadiosComponent } from './listar-estadios.component';

describe('ListarEstadiosComponent', () => {
  let component: ListarEstadiosComponent;
  let fixture: ComponentFixture<ListarEstadiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarEstadiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarEstadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
