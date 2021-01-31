import {Injectable} from '@angular/core';
import {AbstractService} from './commons/AbstractService';
import {HttpClient} from '@angular/common/http';
import {UserSecurityService} from './security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class ParagraphService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
    this.baseUrl = this.baseUrl + 'paragraph/';
  }
}
