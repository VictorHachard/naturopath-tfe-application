import { TestBed } from '@angular/core/testing';

import { InnerparagraphService } from './innerparagraph.service';

describe('InnerparagraphService', () => {
  let service: InnerparagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerparagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
