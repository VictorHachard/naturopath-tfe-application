import {HttpClient} from '@angular/common/http';
import {UserSecurityService} from '../security/UserSecurity.service';

export class AbstractService {

  protected baseUrl = 'http://127.0.0.1:8080/api/v1/';

  constructor(protected http: HttpClient, protected userSecurityService: UserSecurityService) { }

}
