import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { AppComponent } from './app.component';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';
import { AdherentService } from './services/adherent.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { SectionMenuComponent } from './components/section-menu/section-menu.component';
import { AdherentDetailsComponent } from './components/adherent-details/adherent-details.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule,NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdherentEditComponent } from './components/adherent-edit/adherent-edit.component';
import { SectionListComponent } from './components/section-list/section-list.component';
import { AdherentAddComponent } from './components/adherent-add/adherent-add.component';
import { AdherentFormComponent } from './components/adherent-form/adherent-form.component';
import{  FormsModule}  from '@angular/forms';

const routes :Routes = [
  {path:"adherent/edit/:id", component:AdherentEditComponent},
  {path:"adherent/add", component:AdherentAddComponent},
  {path:"adherent/forms", component:AdherentFormComponent},
  {path:"home", component:HomeComponent},
  {path:"adherent/:id", component: AdherentDetailsComponent},
  {path:"search/:keyword", component:AdherentListComponent},
  {path : "sexe/:id" , component : AdherentListComponent},
  {path : "sexe" , component : AdherentListComponent},
  {path : "section/:id" , component : AdherentListComponent},
  {path : "section" , component : AdherentListComponent},
  {path : "adherents" , component : AdherentListComponent},
  {path : "" , redirectTo:"/adherents", pathMatch:"full"},
  {path : "**" , redirectTo:"/adherents", pathMatch:"full"}
];
@NgModule({
  declarations: [
    AppComponent,
    AdherentListComponent,
    SectionMenuComponent,
    SearchComponent,
    AdherentDetailsComponent,
    HomeComponent,
    NavBarComponent,
    AdherentEditComponent,
    SectionListComponent,
    AdherentAddComponent,
    AdherentFormComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbPaginationModule,
    NgbModule,
    FormsModule
    
    
  ],
  providers: [AdherentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
