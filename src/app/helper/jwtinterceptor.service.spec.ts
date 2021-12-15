import { TestBed } from '@angular/core/testing';

import { jwtInterceptorService } from './jwtinterceptor.service';

describe('JwtinterceptorService', () => {
  let service: jwtInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(jwtInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
