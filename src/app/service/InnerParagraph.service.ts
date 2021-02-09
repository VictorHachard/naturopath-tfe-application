import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InnerParagraphService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerParagraph/';
  }

  public updateInnerParagraph(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public validationInnerParagraph(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addInnerParagraph(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
