import { TestBed } from '@angular/core/testing';

import { InnerParapageService } from './inner-parapage.service';

describe('InnerParapageService', () => {
  let service: InnerParapageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerParapageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
