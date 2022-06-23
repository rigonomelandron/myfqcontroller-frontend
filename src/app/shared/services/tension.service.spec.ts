import { TestBed } from '@angular/core/testing';

import { TensionService } from './tension.service';

describe('TensionService', () => {
  let service: TensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
