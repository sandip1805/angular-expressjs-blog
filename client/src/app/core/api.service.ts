import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  private static formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, params: any = {}): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {headers: params});
  }

  put(path: string, body: any = {}): Observable<any> {
    const checkBody = typeof body === 'string' ? body : JSON.stringify(body);
    return this.http.put(
      `${environment.api_url}${path}`,
      checkBody
    ).pipe(catchError(ApiService.formatErrors));
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body).pipe(catchError(ApiService.formatErrors));
  }

  delete(path: any): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(ApiService.formatErrors));
  }

  deleteBody(path: string, body: any = {}): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body
    };
    return this.http.delete(`${environment.api_url}${path}`, options).pipe(catchError(ApiService.formatErrors));
  }
}
