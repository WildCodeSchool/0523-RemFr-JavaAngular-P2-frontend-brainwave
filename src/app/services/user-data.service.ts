// user-data.service.ts

import { Injectable } from '@angular/core';

import { faker } from '@faker-js/faker';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor() {}

  generateRandomUserData() {
    const roles = ['ADMIN', 'STUDENT', 'TEACHER'];

    const user = {
      userId: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      description: faker.lorem.sentence(),
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(roles),
    };

    return user;
  }

  // Generate an array of 10 user records
  generateRandomUsers() {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(this.generateRandomUserData());
    }
    return users;
  }
}
