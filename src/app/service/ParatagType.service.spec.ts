import { TestBed } from '@angular/core/testing';

import { ParatagTypeService } from './ParatagType.service';

describe('ParatagtypeService', () => {
  let service: ParatagTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParatagTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
