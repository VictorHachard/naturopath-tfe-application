import { TestBed } from '@angular/core/testing';

import { ParagraphTypeService } from './ParagraphType.service';

describe('ParagraphtypeService', () => {
  let service: ParagraphTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
