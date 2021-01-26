import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public addVote(body: any): void {
    this.http.post<any>(this.baseUrl + 'vote', body).subscribe();
  }
}
