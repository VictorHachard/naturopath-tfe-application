import {TestBed} from '@angular/core/testing';

import {InnerTagService} from './InnerTag.service';

describe('InnertagService', () => {
  let service: InnerTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
