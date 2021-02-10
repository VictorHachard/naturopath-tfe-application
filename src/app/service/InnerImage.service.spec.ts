import { TestBed } from '@angular/core/testing';

import { InnerImageService } from './InnerImage.service';

describe('InnerImageService', () => {
  let service: InnerImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
