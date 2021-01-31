import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from './commons/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class InnerParagraphService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  public updateInnerParagraph(id: string, body: any): void {
    this.http.put<any>(this.baseUrl + 'innerParagraph/update/' + id, body).subscribe();
  }

  public validationInnerParagraph(id: string): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph/validation/' + id, {}).subscribe();
  }

  public addInnerParagraph(body: any): void {
    this.http.post<any>(this.baseUrl + 'innerParagraph', body).subscribe();
  }
}
