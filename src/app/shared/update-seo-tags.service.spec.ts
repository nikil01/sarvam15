import { TestBed } from '@angular/core/testing';

import { UpdateSeoTagsService } from './update-seo-tags.service';

describe('UpdateSeoTagsService', () => {
  let service: UpdateSeoTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSeoTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
