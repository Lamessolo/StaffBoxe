import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { AdherentUpdate } from 'src/app/common/adherentUpdate';
import { Categorie } from 'src/app/common/categorie';
import { Section } from 'src/app/common/section';
import { Sexe } from 'src/app/common/sexe';
import { AdherentService } from 'src/app/services/adherent.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { SectionService } from 'src/app/services/section.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-view-adherent',
  templateUrl: './view-adherent.component.html',
  styleUrls: ['./view-adherent.component.css']
})
export class ViewAdherentComponent implements OnInit {
 
 /*adherent : Adherent = new Adherent();*/
 adherentId : number | null | undefined;
 sexes: Sexe[] = []
 sections : Section[]=[]
 categories : Categorie [] = []
 adherent : Adherent = {
   id: 0,
   name: '',
   prenom: '',
   adresse: '',
   email: '',
   phone: '',
   imageUrl: '',
   statut: '',
   poid: 0,
   dateNaissance:new Date('2022-06-09'),
   sexe: {
    id: 0,
    name: ''
   },
   section: {
   id: 0,	
   sectionId :'',
   description : '',
   name : '' ,
   tarif : 0
   },
   categorie: {
    id: 0,	
    name:'' ,
    description : ''
   }
 }
 displayProfileImageUrl='assets/images/staffboxe.png';
 adherentUpdate : AdherentUpdate ={ 
   id: 0,
   name: '',
   prenom: '',
   adresse: '',
   email: '',
   phone: '',
   imageUrl: '',
   statut: '',
   poid: 0,
   dateNaissance: new Date('2022-08-03'),
   sexe: 0,
   section: 0,
   categorie: 0
 }
  constructor(private readonly adherentService: AdherentService,
              private readonly sexeService: SexeService,
              private readonly categorieService: CategorieService,
              private readonly sectionService: SectionService,
      private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.adherentId = +this.route.snapshot.paramMap.get('id')!;
    if(this.adherentId){
     this.loadAdherentById();
    }
   this.loadSexeList();
   this.loadSectionList();
   this.loadCategorieList();
    }
    
  loadAdherentById(){
    this.adherentId = +this.route.snapshot.paramMap.get('id')!;
    this.adherentService.getAdherentById(this.adherentId).subscribe(
      (sucessResponse)=>{
        this.adherent = sucessResponse;
      }
    );
  }  
  loadSexeList(){
      this.sexeService.getSexeList().subscribe(data =>{
       this.sexes = data;
      })
  }
  loadSectionList(){
        this.sectionService.getSectionList().subscribe(data  =>{
          this.sections = data;
         });
  }
  loadCategorieList(){
        this.categorieService.getCategorieList().subscribe(data  =>{
          this.categories = data;
         });
  }    

  onUpdate():void{
      }

  
/* Une fonction pour upload l'image en recuperant et modifiant imageUrl */
      uploadImage(event :any ):void{
        this.adherentId = +this.route.snapshot.paramMap.get('id')!;
        if(this.adherentId){
          const file: File = event.target.files[0];
          this.adherentService.uploadImage(this.adherentId,file)
          .subscribe((successResponse)=>{
            this.adherent.imageUrl = successResponse.fileName;
            this.setImage();
            //Show une notification
          /*  this.snackbar.open('Profile Image Updated', undefined,{duration:2000})*/
          }) 
        }
    }
  
    private setImage():void{
  if(this.adherent.imageUrl){
    // Fetch the image by url
  this.displayProfileImageUrl= this.adherent.imageUrl;
  }
  else{
    // display a default
    this.displayProfileImageUrl;
  }
 
}
}
