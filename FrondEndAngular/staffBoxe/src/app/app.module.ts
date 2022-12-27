import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import { AdherentService } from './services/adherent.service';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule,NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionListComponent } from './components/section-list/section-list.component';

import{  FormsModule}  from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PostsComponent } from './components/posts/posts.component';
import { ViewAdherentComponent } from './components/view-adherent/view-adherent.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { AdherentsComponent } from './components/adherents/adherents.component';
import { InfoComponent } from './components/info/info.component';
import { UsersComponent } from './components/users/users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { SectionDetailsComponent } from './components/section-details/section-details.component';


const routes :Routes = [
  {path:"section/:id", component:SectionDetailsComponent},
  {path:"users", component:UsersComponent},
  {path:"user/:id", component:ViewUserComponent},
  {path:"adherents", component: AdherentsComponent},
  {path:"adherent/:id", component:ViewAdherentComponent},
  {path:"home", component:HomeComponent},
  {path : "posts" , component : PostsComponent},
  {path : "post/:id" , component : ViewPostComponent},
  {path : "" , redirectTo:"/home", pathMatch:"full"},
  {path : "**" , redirectTo:"/adherents", pathMatch:"full"}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SectionListComponent,
    PostsComponent,
    AdherentsComponent,
    ViewAdherentComponent,
    ViewPostComponent,
    InfoComponent,
    UsersComponent,
    ViewUserComponent,
    CartStatusComponent,
    SectionDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbPaginationModule,
    NgbModule,
    FormsModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],exports:[PaginationModule],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AdherentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
