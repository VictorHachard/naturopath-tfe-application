import {TestBed} from '@angular/core/testing';

import {ParagraphService} from './Paragraph.service';

describe('ParagraphService', () => {
  let service: ParagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
