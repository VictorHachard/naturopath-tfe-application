import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/view/Page';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class UserSecurityService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }


  public addUser(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'user/register', body);
  }

  public loginUser(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'user/login', body);
  }

  public resetPassword(body: any): void {
    this.http.post<any>(this.baseUrl + 'user/set/resetAccount', body).subscribe();
  }
}
