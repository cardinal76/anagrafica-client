import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DataAccessService {
  private readonly apiBase: string = 'registry';

  /**
   * request headers
   */
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
              ) {
  }

  // tslint:disable-next-line:typedef
  public getString(url: string) {
    return this.http.get(this.apiBase + '/' + url, {responseType: 'text'});
  }

  public postGeneric<T>(object: any, typeUrl: string): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(this.apiBase + '/' + typeUrl, JSON.stringify(object), this.getRequestOptions());
  }

  public getGeneric<T>(typeUrl: string): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(this.apiBase + '/' + typeUrl, this.getRequestOptions());
  }
  private getRequestOptions() {
    this.setHeaders();
    return {headers: this.headers};
  }
  private setHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }
}
