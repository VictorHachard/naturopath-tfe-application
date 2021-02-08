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

  public validationInnerTag(innerTagId: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + innerTagId, {},
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateInnerTag(innerTagId: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + innerTagId, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addInnerTag(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}