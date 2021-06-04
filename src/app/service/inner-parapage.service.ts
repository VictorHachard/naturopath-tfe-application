import { Injectable } from '@angular/core';
import {AbstractInner} from './commons/AbstractInner';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InnerParapageService extends AbstractInner {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'innerParapage/';
  }
}
