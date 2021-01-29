import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParagraphtypeService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public getParagraphDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/paragraphType/' + id);
  }

  public getAllParagraphType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/paragraphType');
  }

  addTagType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'paragraphType', body);
  }

  public updateParagraphType(id: string, body: any): void {
    this.http.put<any>(this.baseUrl + 'paragraphType/update/' + id, body).subscribe();
  }
}
