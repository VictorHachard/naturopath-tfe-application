import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractInner} from './commons/AbstractInner';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InnerTagService extends AbstractInner {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerTag/';
  }

}
