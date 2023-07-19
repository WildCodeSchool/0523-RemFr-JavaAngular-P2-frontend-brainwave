import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page.pages',
  templateUrl: './home.pages.component.html',
  styleUrls: ['./home.pages.component.scss'],
})
export class HomePagesComponent {
  token = this.getToken.get('token');

  constructor(private http: HttpClient, private getToken: CookieService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
    withCredentials: true,
  };

  getAllUsers() {
    return this.http.get('http://localhost:8080/users', this.httpOptions).subscribe(
      (data) => console.log(data),
      (error) => console.error(error)
    );
  }
}
