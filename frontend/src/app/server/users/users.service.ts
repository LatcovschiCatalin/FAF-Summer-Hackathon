import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Users} from "./users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServer = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  post(user: Users, tab: String): Observable<Users> {
    return this.httpClient.post<Users>(this.apiServer + `/${tab}/`, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id: any, tab: String): Observable<Users> {
    return this.httpClient.get<Users>(this.apiServer + `/${tab}/` + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  get(tab: String): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.apiServer + `/${tab}/`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  put(user: Users, id: any, tab: String): Observable<Users> {
    return this.httpClient.put<Users>(this.apiServer + `/${tab}/` + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteById(id: any, tab: String) {
    return this.httpClient.delete<Users>(this.apiServer + `/${tab}/` + id, this.httpOptions)
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

