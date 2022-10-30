import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { Section } from 'src/app/common/section';
import { AdherentService } from 'src/app/services/adherent.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-adherent-edit',
  templateUrl: './adherent-edit.component.html',
  styleUrls: ['./adherent-edit.component.css']
})
export class AdherentEditComponent implements OnInit {

  id! : number;
  adherent : Adherent = new Adherent();
  sections! : Section[]
  constructor(private adherentService : AdherentService,
              private route : ActivatedRoute,
              private router :Router, private sectionService : SectionService ) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.loadAdherent();
    this.loadSections();
  }

  loadAdherent(){
   this.adherentService.getAdherentById(this.id).subscribe(data =>{
    this.adherent = data ;
   });
  }
  loadSections(){
    this.sectionService.getSectionList().subscribe(data  =>{
      this.sections = data;
     });
  }

  goToAdherentDetail(){
this.router.navigate(['/adherent/'+this.id])
  }

  onSubmit():void {
    console.log();
    this.adherentService.updateAdherent(this.adherent,this.id).subscribe(
      data=>{
        this.goToAdherentDetail();
      }, error => console.log(error));
  }
}
