import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaDivisionComponent } from './segunda-division.component';

describe('SegundaDivisionComponent', () => {
  let component: SegundaDivisionComponent;
  let fixture: ComponentFixture<SegundaDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SegundaDivisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegundaDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
