import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class InnerPageService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

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
