import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class TagService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public addTag(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'tag', body);
  }

  public getEditTagDto(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dto/edit/tag/' + id);
  }
}
