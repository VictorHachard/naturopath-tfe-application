import {Injectable} from '@angular/core';
import {AbstractService} from './service/commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserSecurityService} from './service/security/UserSecurity.service';

@Injectable({
  providedIn: 'root'
})
export class TestService extends AbstractService {

  constructor(http: HttpClient, userSecurityService: UserSecurityService) {
    super(http, userSecurityService);
  }

  public testGet(body: any, token: string): void {
    this.userSecurityService.getUserSecurity().subscribe(value => {
      this.http.get(this.baseUrl + 'test/user', {headers : new HttpHeaders().set('Authorization', 'Bearer ' + value.id)})
        .subscribe(response => console.log(response));
    });
  }
}
