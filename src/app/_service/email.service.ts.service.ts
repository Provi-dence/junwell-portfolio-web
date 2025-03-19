import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private scriptURL = 'https://script.google.com/macros/s/AKfycbwRWnbZnheuL08UM-JOKj9QSGEUoFIq2IwJdZ3UwTAAk6BOZBW3ur0L7SiYmZvqAZCv/exec';

  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, subject: string, message: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    return this.http.post(this.scriptURL, formData);
  }
}
