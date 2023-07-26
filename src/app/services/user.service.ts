import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getData() {
    throw new Error('Method not implemented.');
  }
  private userData = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get(this.userData);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.userData}/${userId}`;
    return this.httpClient.get<any>(url);
  }
  getUserName(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(map((user: any) => `${user.firstname} ${user.lastname}`));
  }
  updateUserById(userId: string, body: { promotionId: any } | undefined) {
    const url = `http://localhost:8080/users/${userId}`;
    return this.httpClient.put(url, body);
  }
}
