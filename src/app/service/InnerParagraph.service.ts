import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    return this.http.put<any>(this.baseUrl + 'update/' + id, body);
  }

  public validationInnerParagraph(id: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'validation/' + id, {});
  }

  public addInnerParagraph(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }
}
