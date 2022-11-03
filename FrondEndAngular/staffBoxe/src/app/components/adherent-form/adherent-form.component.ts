import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { Categorie } from 'src/app/common/categorie';
import { Section } from 'src/app/common/section';
import { Sexe } from 'src/app/common/sexe';
import { AdherentService } from 'src/app/services/adherent.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { SectionService } from 'src/app/services/section.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-adherent-form',
  templateUrl: './adherent-form.component.html',
  styleUrls: ['./adherent-form.component.css']
})
export class AdherentFormComponent implements OnInit {

  adherent : Adherent = new Adherent();
  sections! : Section[];
  categories! : Categorie[];
  sexes! : Sexe[];
  constructor(private adherentService : AdherentService, 
               private router : Router,
               private categorieService : CategorieService,
               private sectionService : SectionService,
               private sexeService : SexeService) { }

  ngOnInit(): void {
  this.loadSections();
  this.loadSexes();
  this.loadCategories();
  }

  loadSections(){
    this.sectionService.getSectionList().subscribe(data  =>{
      this.sections = data;
     });
  }

  loadSexes(){
    this.sexeService.getSexeList().subscribe(data => {
      this.sexes = data ;
    });
  }
  loadCategories(){
    this.categorieService.getCategorieList().subscribe(data => {
      this.categories = data ;
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