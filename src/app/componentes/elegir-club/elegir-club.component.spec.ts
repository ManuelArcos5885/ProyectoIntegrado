import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirClubComponent } from './elegir-club.component';

describe('ElegirClubComponent', () => {
  let component: ElegirClubComponent;
  let fixture: ComponentFixture<ElegirClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElegirClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegirClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
