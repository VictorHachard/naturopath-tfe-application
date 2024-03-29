import {Injectable} from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParagraphService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'paragraph/';
  }
}
