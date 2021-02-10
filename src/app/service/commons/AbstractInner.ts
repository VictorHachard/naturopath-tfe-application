import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractService} from './AbstractService';
import {Observable} from 'rxjs';

export class AbstractInner extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public validationInnerTag(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateInnerTag(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addInnerTag(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addMessage(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addMessage/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

}
