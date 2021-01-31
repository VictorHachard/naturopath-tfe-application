import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';
import {UserSecurityService} from './security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class PageService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
    this.baseUrl = this.baseUrl + 'page/';
  }

  public getAllPage(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto');
  }

  public getPage(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/' + id);
  }

  public getAllPageByCategory(id: string): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + 'dto/pageByCategory', { categoryId: id });
  }

  public getEditPageDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id);
  }

  public addPage(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }
}
