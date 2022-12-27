import { HttpParams } from '@angular/common/http';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { AdherentAdd } from 'src/app/common/adherentAdd';
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
 adherentId !: string | null | undefined;
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
   tarif : 0,
   imageUrl:'',
   content:''
   },
   categorie: {
    id: 0,	
    name:'' ,
    description : ''
   }
 }
 
 isNewAdherent = true;
 header = '';
 displayProfileImageUrl='assets/images/staff.jpg';
 
  constructor(private readonly adherentService: AdherentService,
              private readonly sexeService: SexeService,
              private readonly categorieService: CategorieService,
              private readonly sectionService: SectionService,
              private snackbar:MatSnackBar,
              private router: Router,
      private readonly route: ActivatedRoute) { }

  ngOnInit(): void { 
     this.adherentId = this.route.snapshot.paramMap.get('id')!;
      if(this.adherentId){     
        //If the route contains the 'Add'
        if(this.adherentId.toString().toLowerCase()=== 'Add'.toLowerCase()){
          // New student fonctionnality
             this.isNewAdherent = true;
             this.header ="Add New Student";
        }else{
          // Existing adherent functionnality
            this.isNewAdherent = false;
            this.header ="Update Student";
        }
        this.loadAdherentById();
        }

  
   this.loadSexeList();
   this.loadSectionList();
   this.loadCategorieList();
    }
    
  loadAdherentById(){
    const idAdherent : number = +this.route.snapshot.paramMap.get('id')!;
  //  this.adherentId = +this.route.snapshot.paramMap.get('id')!;
    this.adherentService.getAdherentById(idAdherent).subscribe(
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
    this.adherentService.putUpdateAdherent(this.adherent.id,this.adherent)
    .subscribe((successResponse)=>{
      //Show notification
      this.snackbar.open('Adherent updated successfully', undefined,
      {duration: 2500});
console.log(successResponse);
    },(error)=>{

    }) ; 
}

onDelete():void{
 this.adherentService.deleteAdherent(this.adherent.id).subscribe(
  (successResponse)=>{
     //Show notification
     this.snackbar.open('Adherent deleted successfully', undefined,
     {duration: 2500});

     setTimeout(()=>{
      this.router.navigateByUrl('adherents');
     }, 2500);
    
    console.log(successResponse);
  },(error)=>{

  }
 );
}

onAdd(): void{
 this.adherentService.addAdherent(this.adherent).subscribe(
  (successResponse)=>{
    console.log(successResponse);
    //Show notification
    this.snackbar.open('Adherent created successfully', undefined,
    {duration: 2500});

    setTimeout(()=>{
     this.router.navigateByUrl('adherents');
    }, 3000);
  
 },(error)=>{
console.log(error);
 }
 );
}
  
/* Une fonction pour upload l'image en recuperant et modifiant imageUrl */
      uploadImage(event :any ):void{
    const idAdherent : number = +this.route.snapshot.paramMap.get('id')!;
      //  this.adherentId = +this.route.snapshot.paramMap.get('id')!;
        if(idAdherent){
          const file: File = event.target.files[0];
            this.adherentService.uploadImage(idAdherent,file)
       //   this.adherentService.uploadImage(this.adherentId,file)
          .subscribe((successResponse)=>{
           this.adherent.imageUrl = successResponse.fileName;
            this.setImage();
            //Show une notification
            this.snackbar.open('Profile Image Updated', undefined,{duration:2000});
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
