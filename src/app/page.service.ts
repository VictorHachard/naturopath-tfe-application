import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from './Model/Page';
@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {

  }

  public getAllPage(): Observable<Page[]> {
    return this.http.get<Page[]>(this.baseUrl + 'page');
  }

  public createPage(): void{

  }
}
