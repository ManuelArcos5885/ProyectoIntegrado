import { TestBed } from '@angular/core/testing';

import { DatosEquipoService } from './datos-equipo.service';

describe('DatosEquipoService', () => {
  let service: DatosEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
