import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AbstractService} from '../commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class UserSecurityService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'userSecurity/';
  }

  public logger = new Subject<boolean>();

  public isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
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
