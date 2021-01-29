import { TestBed } from '@angular/core/testing';

import { InnerpageService } from './innerpage.service';

describe('InnerpageService', () => {
  let service: InnerpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
