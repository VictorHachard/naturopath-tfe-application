import { Injectable } from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InnerParatagService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerParatag/';
  }

  public updateInnerParatag(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public validationInnerParatag(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addInnerParatag(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
