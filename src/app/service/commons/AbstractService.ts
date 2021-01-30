import {HttpClient} from '@angular/common/http';

export class AbstractService {

  protected baseUrl = 'http://localhost:8080/api/v1/';

  constructor(protected http: HttpClient) { }

}
