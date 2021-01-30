import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class VoteService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public addVote(body: any): void {
    this.http.post<any>(this.baseUrl + 'vote', body).subscribe();
  }
}
