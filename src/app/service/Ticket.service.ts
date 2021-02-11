import {Injectable} from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends AbstractService {
  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'ticket/';
  }

  public addTicket(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllForCurrentUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dtoForUser',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getForCurrentUser(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dtoForUser/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllOpen(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public get(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addMessage(id: string, body: { content: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addMessage/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public close(id: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'close/' + id, {},
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
