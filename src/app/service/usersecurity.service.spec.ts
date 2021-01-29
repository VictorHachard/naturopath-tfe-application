import { TestBed } from '@angular/core/testing';

import { UsersecurityService } from './usersecurity.service';

describe('UsersecurityService', () => {
  let service: UsersecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
