import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';

@Component({
  selector: 'app-adherent-list',
  templateUrl: './adherent-list-grid.component.html',
  styleUrls: ['./adherent-list.component.css']
})
export class AdherentListComponent implements OnInit {
  section! : Section[];
  adherents! : Adherent[]; 
  currentSectionId : number = 3 ;
  searchMode : boolean = false;
  
 

  constructor(private adherentService : AdherentService,
                private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listAdherents();
    }

    )
    
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
   this.currentSectionId = 0;
 this.homeListAdherents();
 }
 
 
  }

  homeListAdherents(){
this.adherentService.getHome().subscribe(data => {
  this.adherents = data;
 });
}

}
