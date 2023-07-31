import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from 'src/app/services/user-data.service';
import { AnswerDataService } from 'src/app/services/answer-data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home-page.pages',
  templateUrl: './home.pages.component.html',
  styleUrls: ['./home.pages.component.scss'],
})
export class HomePagesComponent {
  constructor(private http: HttpClient,private userDataService: UserDataService, private answerDataService : AnswerDataService) {}

  getAllUsers() {
    return this.http.get(environment.apiUrl + '/users').subscribe(
      (data) => console.log(data),
      (error) => console.error(error)
    );
  }
  randomUsers: any[] = [];


  generateRandomUsers() {
    this.randomUsers = this.userDataService.generateRandomUsers();
  }
  randomAnswers: any[] = [];

  generateRandomAnswers() {
    this.randomAnswers = this.answerDataService.generateRandomAnswers();
  }
}
