import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class TagTypeService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'tagType/';
  }

  public getTagType(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllTagType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public addTagType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public updateTagType(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
