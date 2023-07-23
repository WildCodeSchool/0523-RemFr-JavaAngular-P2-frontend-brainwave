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
    try {
      const payload: any = jwtDecode(token);
      return payload.sub;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  getUserConnected(): Observable<string> {
    const token = this.cookieService.get('token');
    const userId = this.getUserToken();

    const userConnectedUrl = `http://localhost:8080/users/${userId}`;
    console.log('service UserID', userConnectedUrl);
    return this.http.get<any>(userConnectedUrl);
  }
}
