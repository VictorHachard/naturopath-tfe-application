import {Injectable} from '@angular/core';
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

  public getAllImageDto(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto',
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getAllEditImageDto(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/edit',
  {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }

  public getEditImageDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/' + id,
      {headers : new HttpHeaders().set('Authorization', this.getUserJwt())});
  }


  public upload(file: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'upload/', file,
      {headers: new HttpHeaders().set('Authorization', this.getUserJwt())}); //{ 'Content-Type': 'multipart/form-data' }
  }

}
