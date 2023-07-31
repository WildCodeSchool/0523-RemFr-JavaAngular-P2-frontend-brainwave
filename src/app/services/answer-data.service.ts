// answer-data.service.ts

import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class AnswerDataService {
  constructor() {}

  generateRandomAnswerData() {
    const answer = {
      id: faker.datatype.uuid(),
      creation_date: faker.date.past(),
      author_id: faker.datatype.uuid(),
      topic_id: faker.datatype.uuid(),
      content: faker.lorem.paragraph(),
    };

    return answer;
  }

  // Generate an array of 10 answer records
  generateRandomAnswers() {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers.push(this.generateRandomAnswerData());
    }
    return answers;
  }
}
