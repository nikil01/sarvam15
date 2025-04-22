import { TestBed } from '@angular/core/testing';

import { IpapiService } from './ipapi.service';

describe('IpapiService', () => {
  let service: IpapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
