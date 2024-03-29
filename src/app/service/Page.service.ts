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
    return this.http.post<any[]>(this.baseUrl + 'dto/search', body);
  }

  public getAllExactPageSearch(body: any): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + 'dto/search/exact', body);
  }

  public getFavoriteAllDto(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/favorite',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllRecommendedPageSearch(body: any): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + 'dto/search/recommended', body);
  }

  public getAllEditPage(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/edit',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllSimplifiedDto(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/simplified',
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

  public publish(id: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'publish/' + id, {},
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addMessage(id: string, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addMessage/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

}
