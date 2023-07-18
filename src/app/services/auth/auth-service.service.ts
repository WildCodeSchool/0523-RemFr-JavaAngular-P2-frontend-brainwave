import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  logout() {
    this.cookieService.delete('token');
  }

  isLoggedIn() {
    return this.cookieService.check('token');
  }
}
