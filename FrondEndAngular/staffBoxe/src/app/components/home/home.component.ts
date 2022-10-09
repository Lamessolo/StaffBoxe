import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adherents : Adherent[] =[] ;
  section:Section[] = [];
  collectionSize :number = 30;
  page : number = 0;
  size : number = 5;
  field : string = "name" ;
  constructor(private adherentService : AdherentService,
              private sectionService : SectionService,
                private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listHomeAdherents();
      this.listHomeSection();
    });
  }
  listHomeAdherents() {
   this.adherentService.getHome(this.page-1,this.size,this.field).subscribe(
    data => {
      this.adherents = data ;
    });
  }

  listHomeSection(){
    this.sectionService.getSectionList().subscribe(
      data => {
        this.section = data ;
      });
    
  }



  updatePageSize(pageSize : string){

    this.size = +pageSize;
    this.page = 0;
    this.listHomeAdherents();
  }
}
