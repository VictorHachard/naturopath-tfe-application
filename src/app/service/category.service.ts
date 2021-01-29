import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/view/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

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
}
