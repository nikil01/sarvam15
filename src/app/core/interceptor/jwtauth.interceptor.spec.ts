import { TestBed } from '@angular/core/testing';

import { JwtauthInterceptor } from './jwtauth.interceptor';

describe('JwtauthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtauthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtauthInterceptor = TestBed.inject(JwtauthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
