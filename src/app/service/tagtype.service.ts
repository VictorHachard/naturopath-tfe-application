import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagtypeService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  public getTagTypeDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/tagType/' + id);
  }

  public getAllTagType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/tagType');
  }

  addTagType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'tagType', body);
  }

  public updateTagType(id: string, body: any): void {
    console.log(this.baseUrl + 'tagType/update/' + id, body);
    this.http.put<any>(this.baseUrl + 'tagType/update/' + id, body).subscribe();
  }
}
