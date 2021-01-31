import {TestBed} from '@angular/core/testing';

import {UserSecurityService} from './UserSecurity.service';

describe('UsersecurityService', () => {
  let service: UserSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
