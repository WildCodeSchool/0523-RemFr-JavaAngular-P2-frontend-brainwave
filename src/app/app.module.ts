import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PromotionsComponent } from './pages/promotions/promotions.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ManagePromotionsComponent } from './pages/manage-promotions/manage-promotions.component';
import { ParticipantsModalComponent } from './components/participants-modal/participants-modal.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LoggedInAuthGuard } from './services/auth/logged-in-auth-guard.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HomePagesComponent } from './pages/home-page.pages/home.pages.component';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { DashboardPagesComponent } from './pages/dashboard/dashboard.pages/dashboard.pages.component';
import { UserInformationsComponent } from './components/dashboard/user-informations/user-informations.component';
import { UserPromotionsComponent } from './components/dashboard/promotions/user-promotions/user-promotions.component';
import { UserDiscussionsComponent } from './components/dashboard/discussions/user-discussions/user-discussions.component';
import { NgOptimizedImage } from '@angular/common';
import { UpdatePromotionComponent } from './pages/update-promotion/update-promotion.component';

@NgModule({
  declarations: [
    AppComponent,
    PromotionsComponent,
    ManagePromotionsComponent,
    ParticipantsModalComponent,
    SecurityPageComponent,
    LoginComponent,
    RegisterComponent,
    HomePagesComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    DashboardPagesComponent,
    UserInformationsComponent,
    UserPromotionsComponent,
    UserDiscussionsComponent,
    UpdatePromotionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
  ],
  providers: [
    CookieService,
    AuthGuard,
    LoggedInAuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
