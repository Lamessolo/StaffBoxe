import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-section-menu',
  templateUrl: './section-menu.component.html',
  styleUrls: ['./section-menu.component.css']
})
export class SectionMenuComponent implements OnInit {

  section!:Section[]  ;
  constructor(private adherentService: AdherentService
              ,private sectionService : SectionService
              ,private route : ActivatedRoute
               ) { }

  ngOnInit(): void {
    this.listSections();
  }
  listSections() {
    this.sectionService.getSectionList().subscribe( data =>{
      console.log('Sections =' + JSON.stringify(data));
      this.section = data ;

    });
  /*  this.adherentService.getSectionList().subscribe(
      
      data =>{
        console.log('Sections =' + JSON.stringify(data));
        this.section = data ;

      }); */
    
  }

}
