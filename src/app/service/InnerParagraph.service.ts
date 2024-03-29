import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';
import {Observable} from 'rxjs';
import {AbstractInner} from './commons/AbstractInner';

@Injectable({
  providedIn: 'root'
})
export class InnerParagraphService extends AbstractInner {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerParagraph/';
  }

}
