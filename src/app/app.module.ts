import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomePagesComponent } from './pages/home-page.pages/home.pages.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth/auth-service.service';
import { LoggedInAuthGuard } from './services/auth/logged-in-auth-guard.service';
import { AuthGuard } from './services/auth/auth-guard.service';

@NgModule({
  declarations: [AppComponent, SecurityPageComponent, LoginComponent, RegisterComponent, HomePagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CookieService, AuthGuard, LoggedInAuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
