import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetBallComponent } from './net-ball.component';

describe('NetBallComponent', () => {
  let component: NetBallComponent;
  let fixture: ComponentFixture<NetBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetBallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
