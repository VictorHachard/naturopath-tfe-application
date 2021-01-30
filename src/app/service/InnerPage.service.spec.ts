import { TestBed } from '@angular/core/testing';

import { InnerPageService } from './InnerPage.service';

describe('InnerpageService', () => {
  let service: InnerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
