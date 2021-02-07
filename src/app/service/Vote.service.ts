import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'vote/';
  }

  public addVote(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
