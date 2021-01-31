import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AbstractService} from '../commons/AbstractService';
import {User} from '../../model/view/User';

@Injectable({
  providedIn: 'root'
})
export class UserSecurityService {

  private routerInfo: BehaviorSubject<User>;

  private _user: any;

  private baseUrl = 'http://127.0.0.1:8080/api/v1/userSecurity/';

  constructor(private http: HttpClient) {
    this.routerInfo = new BehaviorSubject<User>(null);
  }

  public setValue(userSecurity: User): void {
    this.routerInfo.next(userSecurity);
  }

  public getUserSecurity(): Observable<User> {
    return this.routerInfo.asObservable();
  }

  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  public register(body: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'register', body);
  }

  public login(body: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'login', body);
  }

  public getEditDto(): Observable<any> {
    console.log(this.user.id);
    return this.http.get<any>(this.baseUrl + 'dto/edit',
    {headers : new HttpHeaders().set('Authorization', 'Bearer ' + this.user.token)});
  }

  public confirmAccount(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'confirmAccount', body);
  }

  public resetAccount(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'resetAccount', body);
  }

  public deleteAccount(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'deleteAccount', body);
  }

  public setConfirmAccount(): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'setConfirmAccount',
      {headers : new HttpHeaders().set('Authorization', 'Bearer ' + this.user.token)});
  }

  public setResetAccount(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'setResetAccount', body);
  }

  public setDeleteAccount(): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'setDeleteAccount',
      {headers : new HttpHeaders().set('Authorization', 'Bearer ' + this.user.id)});
  }
}
