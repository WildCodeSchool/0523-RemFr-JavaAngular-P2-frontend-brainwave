import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInAuthGuard } from './services/auth/logged-in-auth-guard.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ManagePromotionsComponent } from './pages/manage-promotions/manage-promotions.component';
import { ParticipantsModalComponent } from './components/participants-modal/participants-modal.component';
import { HomePagesComponent } from './pages/home-page.pages/home.pages.component';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';
import { DashboardPagesComponent } from './pages/dashboard/dashboard.pages/dashboard.pages.component';
import { UpdatePromotionComponent } from './pages/update-promotion/update-promotion.component';
import { CreatePromotionsComponent } from './pages/create-promotions/create-promotions.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: 'promotions/create',
    component: CreatePromotionsComponent,
  },
  {
    path: 'promotions',
    component: ManagePromotionsComponent,
  },
  {
    path: 'promotion/:id',
    component: UpdatePromotionComponent,
  },
  {
    path: 'addParticipants/:id',
    component: ParticipantsModalComponent,
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
  {
    path: 'dashboard',
    component: DashboardPagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  { path: '', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
