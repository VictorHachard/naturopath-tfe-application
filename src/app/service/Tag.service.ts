import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class TagService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'tag/';
  }

  public addTag(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getEditTagDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllTag(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllUserTagDto(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/user',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllEditTag(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/edit',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllTagByTagType(id: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'allTagByTagType/dto/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }
}
