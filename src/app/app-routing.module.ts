import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';
import { HomePagesComponent } from './pages/home-page.pages/home.pages.component';
import { LoggedInAuthGuard } from './services/auth/logged-in-auth-guard.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AccueilComponent } from './pages/accueil/accueil.component';

const routes: Routes = [
  { path: '', component: HomePagesComponent },
  { path: 'authentication', component: SecurityPageComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'home', component: HomePagesComponent, canActivate: [AuthGuard] },
  { path: 'accueil', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
