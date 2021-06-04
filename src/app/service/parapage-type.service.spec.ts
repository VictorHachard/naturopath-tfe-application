import { TestBed } from '@angular/core/testing';

import { ParapageTypeService } from './parapage-type.service';

describe('ParapageTypeService', () => {
  let service: ParapageTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParapageTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
