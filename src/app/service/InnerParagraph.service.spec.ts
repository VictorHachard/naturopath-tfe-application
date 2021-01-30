import { TestBed } from '@angular/core/testing';

import { InnerParagraphService } from './InnerParagraph.service';

describe('InnerparagraphService', () => {
  let service: InnerParagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerParagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
