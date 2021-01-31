import {Injectable} from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserSecurityService} from './security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class InnerTagService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
    this.baseUrl = this.baseUrl + 'innerTag/';
  }

  public validationInnerTag(innerTagId: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + innerTagId, {});
  }

  public updateInnerTag(innerTagId: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + innerTagId, body);
  }

  public addInnerTag(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }
}
