import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

}
