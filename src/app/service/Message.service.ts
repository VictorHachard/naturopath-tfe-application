import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = this.baseUrl + 'message/';
  }

}
