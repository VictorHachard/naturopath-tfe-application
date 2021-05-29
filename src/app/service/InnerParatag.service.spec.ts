import { TestBed } from '@angular/core/testing';

import { InnerParatagService } from './InnerParatag.service';

describe('InnerParatagService', () => {
  let service: InnerParatagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerParatagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
