import { TestBed } from '@angular/core/testing';

import { CuvanjeServiceService } from './cuvanje-service.service';

describe('CuvanjeServiceService', () => {
  let service: CuvanjeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuvanjeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
