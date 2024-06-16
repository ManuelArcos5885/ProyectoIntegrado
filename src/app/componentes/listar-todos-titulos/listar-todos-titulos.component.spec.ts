import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodosTitulosComponent } from './listar-todos-titulos.component';

describe('ListarTodosTitulosComponent', () => {
  let component: ListarTodosTitulosComponent;
  let fixture: ComponentFixture<ListarTodosTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarTodosTitulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTodosTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
