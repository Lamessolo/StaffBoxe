import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { PaginationParams } from 'src/app/common/paginationParams';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adherents:Adherent[]= [];
  totalAdherent : number|null|undefined ;
  section:Section[]=[] ;
 
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
   this.adherentService.getHome().subscribe(
    data => {
      this.adherents = data.content;
    });
  }

  listHomeSection(){
    this.sectionService.getSectionList().subscribe(
      data => {
        this.section = data ;
      });
    
  }
}
