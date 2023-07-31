import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';velopment';

@Component({
  selector: 'app-home-page.pages',
  templateUrl: './home.pages.component.html',
  styleUrls: ['./home.pages.component.scss'],
})
export class HomePagesComponent {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(environment.apiUrl + '/users').subscribe(
      (data) => console.log(data),
      (error) => console.error(error)
    );
  }
}
