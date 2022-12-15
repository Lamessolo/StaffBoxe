import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { PaginationParams } from 'src/app/common/paginationParams';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-adherent-list',
  templateUrl: './adherent-list.component.html',
  styleUrls: ['./adherent-list.component.css']
})
export class AdherentListComponent implements OnInit {
  section! : Section[];
  adherents : Adherent[] =[]; 
  // Je construis le tableau 
  displayedColumns: string[] = ['imageUrl','name', 'prenom','email',
  'poid','statut','dateNaissance','edit'];
  dataSource : MatTableDataSource<Adherent> = new MatTableDataSource<Adherent>();
@ViewChild(MatPaginator) matPinator!:MatPaginator
@ViewChild(MatSort) matSort!:MatSort
 filterString ='';

  currentSectionId : number = 3 ;
  searchMode : boolean = false;
  totalAdherent! : number ;
  
 

  constructor(private adherentService : AdherentService,
                private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listAdherents();
    });
    
  }
  listAdherents() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.handleSearchAdherents();
    }
    else
    {
      this.handleListAdherents();
    }
   
  }

  handleSearchAdherents(){
    const theKeyWord : string = this.route.snapshot.paramMap.get('keyword')!;

    // Chercher l'adherent en utilisant le motclef

    this.adherentService.searchAdherent(theKeyWord).subscribe(
      data => {
        this.adherents = data ;

        
      });
  }

  handleListAdherents(){
 // cheik si l' Id Section est valable
 const hasSectionId : boolean = this.route.snapshot.paramMap.has("id");
 if(hasSectionId){
   // On convertis l'id Section de string vers number
   this.currentSectionId = +this.route.snapshot.paramMap.get("id")!;
   this.adherentService.getAdherentList(this.currentSectionId).subscribe(
    data => 
    { this.adherents = data;}
  );
 } else{
   // Il n'ya pas de section Id valable et on met 1 par defaut
   //this.currentSectionId = 0;
 this.homeListAdherents();
 }
 
 
  }

  homeListAdherents(){
this.adherentService.getHome().subscribe(data => {
  this.adherents = data.content;
  // this.posts = successResponse.content;
  this.dataSource = new MatTableDataSource<Adherent>(this.adherents);
  if(this.matPinator){
    this.dataSource.paginator=this.matPinator;
  }
  if(this.matSort){
    this.dataSource.sort=this.matSort;
  }

  this.totalAdherent = data.totalElements;
 }, error => console.log(error));
}

filterAdherents(){
  this.dataSource.filter =this.filterString.trim().toLowerCase()
}

}
