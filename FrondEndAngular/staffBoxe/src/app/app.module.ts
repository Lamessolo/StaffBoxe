import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { AppComponent } from './app.component';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';
import { AdherentService } from './services/adherent.service';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BlogsComponent } from './components/blogs/blogs.component';
import { PostsComponent } from './components/posts/posts.component';
import { ViewAdherentComponent } from './components/view-adherent/view-adherent.component';
import { ViewPostComponent } from './components/view-post/view-post.component';


const routes :Routes = [
  {path:"adherent/edit/:id", component:AdherentEditComponent},
  {path:"adherent/add", component:AdherentAddComponent},
  {path:"adherent/forms", component:AdherentFormComponent},
  {path:"adherents/:id", component:ViewAdherentComponent},
  {path:"home", component:HomeComponent},
  {path:"adherent/:id", component: AdherentDetailsComponent},
  {path:"search/:keyword", component:AdherentListComponent},
  {path : "sexe/:id" , component : AdherentListComponent},
  {path : "sexe" , component : AdherentListComponent},
  {path : "section/:id" , component : AdherentListComponent},
  {path : "section" , component : AdherentListComponent},
  {path : "adherents" , component : AdherentListComponent},
  {path : "posts" , component : PostsComponent},
  {path : "post/:id" , component : ViewPostComponent},
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
    AdherentFormComponent,
    BlogsComponent,
    PostsComponent,
    ViewAdherentComponent,
    ViewPostComponent

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
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
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
