import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-adherent-form',
  templateUrl: './adherent-form.component.html',
  styleUrls: ['./adherent-form.component.css']
})
export class AdherentFormComponent implements OnInit {

  adherent : Adherent = new Adherent();
  sections! : Section[];
  constructor(private adherentService : AdherentService, 
               private router : Router,
               private sectionService : SectionService) { }

  ngOnInit(): void {
  this.loadSections();
  }

  loadSections(){
    this.sectionService.getSectionList().subscribe(data  =>{
      this.sections = data;
     });
  }

  saveAdherent(){
    this.adherentService.addAdherent(this.adherent).subscribe(data =>{
      console.log(data);
      this.goToListAdherent();
    }, error =>console.log(error));
  }

  goToListAdherent(){
 this.router.navigate(['/adherents']);
  }

  onSubmit(){
console.log(this.adherent)
this.saveAdherent();
  }
}
