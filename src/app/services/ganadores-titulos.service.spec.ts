import { TestBed } from '@angular/core/testing';

import { GanadoresTitulosService } from './ganadores-titulos.service';

describe('GanadoresTitulosService', () => {
  let service: GanadoresTitulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanadoresTitulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
