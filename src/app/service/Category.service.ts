import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'category/';
  }

  public getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto');
  }

  public getAllCategoryInAList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/allInAList');
  }

  public getEditCategoryDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllParentCategoryDto(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/getAllParent/',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addCategory(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateCategory(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
