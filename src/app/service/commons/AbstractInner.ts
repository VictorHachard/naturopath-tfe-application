import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractService} from './AbstractService';
import {Observable} from 'rxjs';

export class AbstractInner extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  /*public validationInner(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateInner(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addInner(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addMessage(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addMessage/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }*/

}
