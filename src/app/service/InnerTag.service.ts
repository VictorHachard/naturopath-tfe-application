import {Injectable} from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InnerTagService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerTag/';
  }

  public validationInnerTag(innerTagId: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + innerTagId, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateInnerTag(innerTagId: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + innerTagId, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addInnerTag(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addMessage(id: string, body: any): Observable<any> {
    console.log(id);
    return this.http.post<any>(this.baseUrl + 'addMessage/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
