import { Injectable } from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InnertagService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  validationInnerTag(innerTagId: string): void {
    this.http.post<any>(this.baseUrl + 'innerTag/validation/' + innerTagId, {}).subscribe();
  }

  public updateInnerTag(innerTagId: string, body: any): void {
    this.http.put<any>(this.baseUrl + 'innerTag/update/' + innerTagId, body).subscribe();
  }

  addInnerTag(body: any): void {
    this.http.post<any>(this.baseUrl + 'innerTag', body).subscribe();
  }
}
