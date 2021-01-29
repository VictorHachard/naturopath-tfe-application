import { TestBed } from '@angular/core/testing';

import { ParatagtypeService } from './paratagtype.service';

describe('ParatagtypeService', () => {
  let service: ParatagtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParatagtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
