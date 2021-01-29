import { TestBed } from '@angular/core/testing';

import { ParagraphtypeService } from './paragraphtype.service';

describe('ParagraphtypeService', () => {
  let service: ParagraphtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
