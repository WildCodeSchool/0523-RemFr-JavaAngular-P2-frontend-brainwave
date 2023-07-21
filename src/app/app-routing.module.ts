import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInAuthGuard } from './services/auth/logged-in-auth-guard.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { ManagePromotionsComponent } from './pages/manage-promotions/manage-promotions.component';
import { ParticipantsModalComponent } from './components/participants-modal/participants-modal.component';
import { HomePagesComponent } from './pages/home-page.pages/home.pages.component';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';

const routes: Routes = [
  {
    path: 'promotions',
    component: PromotionsComponent,
  },
  {
    path: 'promotions/',
    component: ManagePromotionsComponent,
  },
  {
    path: 'promotions/:id',
    component: ParticipantsModalComponent,
  },
  {
    path: '',
    component: HomePagesComponent,
  },
  {
    path: 'authentication',
    component: SecurityPageComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'home',
    component: HomePagesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
