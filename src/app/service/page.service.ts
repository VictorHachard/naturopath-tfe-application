import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public getAllPage(): Observable<Page[]> {
    return this.http.get<Page[]>(this.baseUrl + 'dto/page');
  }

  public getPage(id: string): Observable<Page> {
    return this.http.get<Page>(this.baseUrl + 'dto/page/' + id);
  }

  public getAllPageByCategory(id: string): Observable<Page[]> {
    return this.http.post<Page[]>(this.baseUrl + 'dto/pageByCategory', { categoryId: id });
  }

  public createPage(body: any): void {
    this.http.post<any>(this.baseUrl + 'page', body).subscribe();
  }
}
