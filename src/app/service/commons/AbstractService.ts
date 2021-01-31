import {HttpClient} from '@angular/common/http';

export class AbstractService {

  protected baseUrl = 'http://127.0.0.1:8080/api/v1/';

  constructor(protected http: HttpClient) { }

}
