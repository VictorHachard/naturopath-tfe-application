import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';
import {User} from '../model/view/User';

@Injectable({
  providedIn: 'root'
})
export class UserSecurityService extends AbstractService {

  private routerInfo: BehaviorSubject<User>;

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'userSecurity/';
    this.routerInfo = new BehaviorSubject<User>(null);
  }

  public setValue(userSecurity: User): void {
    this.routerInfo.next(userSecurity);
  }

  public getUserSecurity(): Observable<User> {
    return this.routerInfo.asObservable();
  }

  public registerUser(body: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'register', body);
  }

  public loginUser(body: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'login', body);
  }

  public resetPassword(body: any): void {
    this.http.post<any>(this.baseUrl + 'set/resetAccount', body, {headers : new HttpHeaders().set('X-Auth-Token', '')}).subscribe();
  }
}
