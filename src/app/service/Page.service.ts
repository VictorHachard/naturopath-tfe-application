import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class PageService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'page/';
  }

  public getAllPage(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllPageSearch(body: any): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + 'dto/search', body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllEditPage(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/edit',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getPage(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/' + id);
  }

  public getAllPageByCategory(id: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'dto/pageByCategory', { categoryId: id });
  }

  public getEditPageDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addPage(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
