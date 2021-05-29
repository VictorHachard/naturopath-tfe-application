import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractInner} from './commons/AbstractInner';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InnerImageService extends AbstractInner {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerImage/';
  }

  public addInnerImage(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateInnerImage(id: any, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public validationInnerImage(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addMessage(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addMessage/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

}
