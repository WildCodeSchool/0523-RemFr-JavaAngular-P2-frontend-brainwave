import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo/demo.component';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';

const routes: Routes = [
  { path: '', component: DemoPageComponent },
  { path: 'authentication', component: SecurityPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
