import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';
import { HomePagesComponent } from './pages/home-page.pages/home.pages.component';

const routes: Routes = [
  { path: '', component: HomePagesComponent },
  { path: 'authentication', component: SecurityPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
