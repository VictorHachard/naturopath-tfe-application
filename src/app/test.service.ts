import {Injectable} from '@angular/core';
import {AbstractService} from './service/commons/AbstractService';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public testGet(body: any, token: string): void {
    this.http.get(this.baseUrl + 'test/all', {headers : new HttpHeaders().set('Authorization', 'Bearer ' + token)})
      .subscribe(response => console.log(response));
    this.http.get(this.baseUrl + 'test/user', {headers : new HttpHeaders().set('Authorization', 'Bearer ' + token)})
      .subscribe(response => console.log(response));
  }

  /* constructor(private app: AppService, private http: HttpClient) {


  }*/

}
