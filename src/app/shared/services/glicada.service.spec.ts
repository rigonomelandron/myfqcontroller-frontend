import { TestBed } from '@angular/core/testing';

import { GlicadaService } from './glicada.service';

describe('GlicadaService', () => {
  let service: GlicadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlicadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
