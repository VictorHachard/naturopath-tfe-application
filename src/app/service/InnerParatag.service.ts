import { Injectable } from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractInner} from './commons/AbstractInner';

@Injectable({
  providedIn: 'root'
})
export class InnerParatagService extends AbstractInner {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerParatag/';
  }

}
