import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId!: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  logout() {
    this.cookieService.delete('token');
  }

  isLoggedIn() {
    return this.cookieService.check('token');
  }
  getUserToken(): string | null {
    const token = this.cookieService.get('token');
    const payload: any = jwtDecode(token);
    return payload.userId;
  }

  getUserConnected(): Observable<string> {
    const userId = this.getUserToken();
    const userConnectedUrl = `http://localhost:8080/users/${userId}`;
    return this.http.get<string>(userConnectedUrl);
  }
}
