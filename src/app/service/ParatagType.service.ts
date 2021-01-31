import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';
import {UserSecurityService} from './security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class ParatagTypeService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
    this.baseUrl = this.baseUrl + 'paratagType/';
  }

  public getAllParatagType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto');
  }

  public getParatagType(id: string): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'dto/' + id);
  }

  public addParatagType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  public updateParatagType(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body);
  }
}
