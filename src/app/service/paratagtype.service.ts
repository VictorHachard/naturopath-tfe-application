import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParatagtypeService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public getAllParaTagType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/tagType');
  }
}
