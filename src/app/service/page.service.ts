import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/view/Page';

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

  public getEditPageDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/page/' + id);
  }

  public addInnerPage(body: any): void  {
    this.http.post<any>(this.baseUrl + 'innerPage', body).subscribe();
  }

  public updateInnerPage(id: string, body: any): void {
    this.http.post<any>(this.baseUrl + 'innerPage/update/' + id, body).subscribe();
  }

  public updateInnerParagraph(id: string, body: any): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph/update/' + id, body).subscribe();
  }

  public validationInnerPage(id: string): void {
    this.http.post<any>(this.baseUrl + 'innerPage/validation/' + id, {}).subscribe();
  }

  public validationInnerParagraph(id: string): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph/validation/' + id, {}).subscribe();
  }

  public addPage(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'page', body);
  }

  public addInnerParagraph(body: any): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph', body).subscribe();
  }
}
