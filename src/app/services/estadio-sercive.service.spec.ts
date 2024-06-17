import { TestBed } from '@angular/core/testing';

import { EstadioSerciveService } from './estadio-sercive.service';

describe('EstadioSerciveService', () => {
  let service: EstadioSerciveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadioSerciveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
