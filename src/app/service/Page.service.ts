import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/view/Page';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class PageService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'page/';
  }

  public getAllPage(): Observable<Page[]> {
    return this.http.get<Page[]>(this.baseUrl + 'dto');
  }

  public getPage(id: string): Observable<Page> {
    return this.http.get<Page>(this.baseUrl + 'dto/' + id);
  }

  public getAllPageByCategory(id: string): Observable<Page[]> {
    return this.http.post<Page[]>(this.baseUrl + 'dto/pageByCategory', { categoryId: id });
  }

  public getEditPageDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id);
  }

  public addPage(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '', body);
  }
}
