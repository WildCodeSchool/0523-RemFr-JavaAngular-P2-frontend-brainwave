import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard.pages',
  templateUrl: './dashboard.pages.component.html',
  styleUrls: ['./dashboard.pages.component.scss'],
})
export class DashboardPagesComponent implements OnInit {
  userData: any;
  userPromotions: any = [];
  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) {}
  ngOnInit() {
    if (this.cookieService.get('token') === '') {
      this.authService.logout();
    } else {
      this.authService.getUserConnected().subscribe((data) => {
        this.userData = data;
        if (this.userData.promotionParticipantsIds.length > 0) {
          for (let i = 0; i < this.userData.promotionParticipantsIds.length; i++) {
            this.http
              .get(environment.apiUrl + `/promotions/${this.userData.promotionParticipantsIds[i]}`)
              .subscribe((data) => {
                this.userPromotions.push(data);
              });
          }
        }
      });
    }
  }
}
