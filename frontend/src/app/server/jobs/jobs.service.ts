import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Jobs} from "./jobs";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiServer = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  post(job: Jobs): Observable<Jobs> {
    return this.httpClient.post<Jobs>(this.apiServer + `/jobs/`, JSON.stringify(job), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id: any): Observable<Jobs> {
    return this.httpClient.get<Jobs>(this.apiServer + `/jobs/` + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  get(): Observable<Jobs[]> {
    return this.httpClient.get<Jobs[]>(this.apiServer + `/jobs/`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  put(job: Jobs, id: any): Observable<Jobs> {
    return this.httpClient.put<Jobs>(this.apiServer + `/jobs/` + id, JSON.stringify(job), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteById(id: any) {
    return this.httpClient.delete<Jobs>(this.apiServer + `/jobs/` + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

