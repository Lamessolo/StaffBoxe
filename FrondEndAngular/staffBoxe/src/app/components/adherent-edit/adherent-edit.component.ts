import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { Categorie } from 'src/app/common/categorie';
import { Section } from 'src/app/common/section';
import { Sexe } from 'src/app/common/sexe';
import { AdherentService } from 'src/app/services/adherent.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { SectionService } from 'src/app/services/section.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-adherent-edit',
  templateUrl: './adherent-edit.component.html',
  styleUrls: ['./adherent-edit.component.css']
})
export class AdherentEditComponent implements OnInit {

  id! : number;
  adherent : Adherent = new Adherent();
  sections! : Section[]
  sexes!: Sexe[]
  categories! : Categorie[]
  constructor(private adherentService : AdherentService,
              private sexeService : SexeService,
              private categorieService : CategorieService,
              private route : ActivatedRoute,
              private router :Router, 
              private sectionService : SectionService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadAdherent();
    this.loadSections();
    this.loadSexes();
    this.loadCategories();
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
  loadSexes(){
 this.sexeService.getSexeList().subscribe(data =>{
  this.sexes = data;
 })
  }
  loadCategories(){
    this.categorieService.getCategorieList().subscribe(data =>{
     this.categories = data;
    })
     }

  goToAdherentDetail(){
    const theAdherentId : number = +this.route.snapshot.paramMap.get('id')!;
this.router.navigate(['/adherent/'+ theAdherentId])
  }

  onSubmit():void {
    const theAdherentId : number = +this.route.snapshot.paramMap.get('id')!;
    this.adherentService.updateAdherent(this.adherent,theAdherentId).subscribe(
      data=>{
        console.log(this.adherent)
        this.goToAdherentDetail();
      }, error => console.log(error));
  }
}
