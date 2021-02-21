import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AbstractService} from '../commons/AbstractService';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSecurityService extends AbstractService {

  public logger = new Subject<boolean>();
  public dark = new Subject<boolean>();
  public change = new Subject<boolean>();

  constructor(http: HttpClient, private router: Router) {
    super(http);
    this.baseUrl = this.baseUrl + 'userSecurity/';
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.logger.next(localStorage.getItem('currentUser') !== null);
        this.dark.next(localStorage.getItem('currentUser') !== null && JSON.parse(localStorage.getItem('currentUser')).dark);
      }
    });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  public settingsChange(): Observable<boolean> {
    return this.change.asObservable();
  }

  public isDark(): Observable<boolean> {
    return this.dark.asObservable();
  }

  private authenticateUser(user: string, password: string): string {
    return 'Basic ' + btoa(user + ':' + password);
  }

  public register(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', body);
  }

  public login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', {token: this.authenticateUser(usernameOrEmail, password)});
  }

  public confirmAuth(usernameOrEmail: string, password: string, code: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'confirmAuth', {token: this.authenticateUser(usernameOrEmail, password), code: code});
  }

  public getEditDto(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit',
    {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
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
    return this.http.post<any>(this.baseUrl + 'set/confirmAccount', {},
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public setResetAccount(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'set/resetAccount', body);
  }

  public setDeleteAccount(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'set/deleteAccount', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateUsernameEmail(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateName(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'updateName', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updatePassword(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'updatePassword', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updatePrivacy(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'updatePrivacy', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateAppearance(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'updateAppearance', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
