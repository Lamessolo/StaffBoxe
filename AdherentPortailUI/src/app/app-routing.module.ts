import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdherentDetailsComponent } from './Component/adherent-details/adherent-details.component';
import { AdherentsComponent } from './Component/adherents/adherents.component';

const routes: Routes = [
  {path:'',component:AdherentsComponent},
  {path:'adherents',component:AdherentsComponent},
  {path:'adherent/:id',component:AdherentDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
