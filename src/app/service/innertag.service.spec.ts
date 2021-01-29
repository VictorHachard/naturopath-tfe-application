import { TestBed } from '@angular/core/testing';

import { InnertagService } from './innertag.service';

describe('InnertagService', () => {
  let service: InnertagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnertagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
