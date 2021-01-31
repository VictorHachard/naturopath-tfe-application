import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class ParatagTypeService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllParatagType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'dto/paratagType');
  }

  public getParatagType(id: string): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'dto/paratagType/' + id);
  }

  public addParatagType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'paratagType', body);
  }

  public updateParatagType(id: string, body: any): void {
    this.http.put<any>(this.baseUrl + 'paratagType/update/' + id, body).subscribe();
  }
}
