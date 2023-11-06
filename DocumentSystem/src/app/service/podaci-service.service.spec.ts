import { TestBed } from '@angular/core/testing';

import { PodaciServiceService } from './podaci-service.service';

describe('PodaciServiceService', () => {
  let service: PodaciServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodaciServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
