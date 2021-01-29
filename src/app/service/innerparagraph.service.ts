import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InnerparagraphService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public updateInnerParagraph(id: string, body: any): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph/update/' + id, body).subscribe();
  }

  public validationInnerParagraph(id: string): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph/validation/' + id, {}).subscribe();
  }

  public addInnerParagraph(body: any): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph', body).subscribe();
  }
}
