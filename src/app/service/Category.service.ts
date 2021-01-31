import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';
import {UserSecurityService} from './security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
    this.baseUrl = this.baseUrl + 'category/';
  }

  public getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto');
  }

  public getEditCategoryDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id);
  }

  public getAllParentCategoryDto(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/getAllParent/');
  }

  public addCategory(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  public updateCategory(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body);
  }
}
