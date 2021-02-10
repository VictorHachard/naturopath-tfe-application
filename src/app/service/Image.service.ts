import { Injectable } from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'image/';
  }

  public addImage(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getEditImageDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

}
