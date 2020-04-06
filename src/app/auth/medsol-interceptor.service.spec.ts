import { TestBed } from '@angular/core/testing';

import { MedsolInterceptorService } from './medsol-interceptor.service';

describe('MedsolInterceptorService', () => {
  let service: MedsolInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedsolInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
