import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InnerpageService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public addInnerPage(body: any): void  {
    this.http.post<any>(this.baseUrl + 'innerPage', body).subscribe();
  }

  public updateInnerPage(id: string, body: any): void {
    this.http.put<any>(this.baseUrl + 'innerPage/update/' + id, body).subscribe();
  }

  public validationInnerPage(id: string): void {
    this.http.post<any>(this.baseUrl + 'innerPage/validation/' + id, {}).subscribe();
  }
}
