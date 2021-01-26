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

  public addCategory(): void{
  }
}
