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
    this.id = this.route.snapshot.params['id'];
    this.loadAdherent();
    this.loadSections();
  }

  loadAdherent(){
  const theAdherentId : number = +this.route.snapshot.paramMap.get('id')!;
   this.adherentService.getAdherentById(theAdherentId).subscribe(data =>{
    this.adherent = data ;
   });
  }
  loadSections(){
    this.sectionService.getSectionList().subscribe(data  =>{
      this.sections = data;
     });
  }

  goToAdherentDetail(){
    const theAdherentId : number = +this.route.snapshot.paramMap.get('id')!;
this.router.navigate(['/adherent/'+ theAdherentId])
  }

  onSubmit():void {
    console.log();
    const theAdherentId : number = +this.route.snapshot.paramMap.get('id')!;
    this.adherentService.updateAdherent(this.adherent,theAdherentId).subscribe(
      data=>{
        this.goToAdherentDetail();
      }, error => console.log(error));
  }
}
