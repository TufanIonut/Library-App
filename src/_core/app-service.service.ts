import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private readonly serverUrl = 'https://localhost:7223/api';

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/Author/GetAuthors`);
  }
  getBooks(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/Book/GetBooks`);
  }
  loginUser(body: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/User/AuthenticateUser', body);
  }
  register(body: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/User/RegisterUser', body);
  }
  getNationalities(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/Author/GetNationalities');
  }
  addAuthor(body: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Author/AddAuthor', body);
  }
  addBook(body: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Book/AddBookWithAuthors', body);
  }
  checkAdmin(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/User/GetAdmin');
  }
}
