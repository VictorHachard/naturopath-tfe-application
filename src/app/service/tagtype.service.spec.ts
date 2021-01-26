import { TestBed } from '@angular/core/testing';

import { TagtypeService } from './tagtype.service';

describe('TagtypeService', () => {
  let service: TagtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
