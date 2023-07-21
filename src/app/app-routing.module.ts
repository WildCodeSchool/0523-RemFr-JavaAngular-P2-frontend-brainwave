import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { ManagePromotionsComponent } from './pages/manage-promotions/manage-promotions.component';
import { ParticipantsModalComponent } from './components/participants-modal/participants-modal.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionsComponent,
  },
  {
    path: 'promotions',
    component: ManagePromotionsComponent,
  },
  {
    path: 'promotions/:id',
    component: ParticipantsModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
