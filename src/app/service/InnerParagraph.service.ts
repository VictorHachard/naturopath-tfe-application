import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';
import {Observable} from 'rxjs';
import {UserSecurityService} from './security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class InnerParagraphService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
    this.baseUrl = this.baseUrl + 'innerParagraph/';
  }

  public updateInnerParagraph(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', 'Bearer ' + this.userSecurityService.user.token)});
  }

  public validationInnerParagraph(id: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, {},
      {headers : new HttpHeaders().set('Authorization', 'Bearer ' + this.userSecurityService.user.token)});
  }

  public addInnerParagraph(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', 'Bearer ' + this.userSecurityService.user.token)});
  }
}
