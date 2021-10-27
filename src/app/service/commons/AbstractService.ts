import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

export class AbstractService {

  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) { }

  protected getUserJwt(): string {
    return 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  }

}
