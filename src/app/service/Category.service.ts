import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/view/Category';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'dto/category');
  }

  public getEditCategoryDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/category/' + id);
  }

  public getAllParentCategoryDto(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/getAllParent/');
  }

  public addCategory(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'category', body);
  }

  public updateCategory(id: string, body: any): void {
    this.http.put<any>(this.baseUrl + 'category/update/' + id, body).subscribe();
  }
}
