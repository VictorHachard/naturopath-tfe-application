import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public addTag(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'tag', body);
  }

  public getEditTagDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/tag/' + id);
  }
}
