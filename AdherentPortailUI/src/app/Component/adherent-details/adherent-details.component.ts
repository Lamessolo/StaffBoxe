import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Model//ui-models/gender';
import { Adherent } from 'src/app/Model/ui-models/adherent';
import { GenderService } from 'src/app/Services/gender.service';
import { AdherentService } from '../adherents/adherent.service';
@Component({
  selector: 'app-adherent-details',
  templateUrl: './adherent-details.component.html',
  styleUrls: ['./adherent-details.component.css']
})
export class AdherentDetailsComponent implements OnInit {
 adherentId : string | null | undefined;
 adherent : Adherent = {
   id: '',
   firstName: '',
   lastName: '',
   mobile: 0,
   poid:0,
   email: '',
   profileImage: '',
   dateOfBirth: '',
   genderId: '',
   gender: {
    id :'',
    description: ''
   },
   adresse:{
    id : '',
    physicalAdresse:'',
    postalAdresse: ''
   }
 }
 isNewAdherent = false;
 header ='';
 displayProfileImageUrl='assets/staffboxe.png';
 genderList : Gender[] = [];
  constructor(private readonly adherentService : AdherentService,
              private readonly genderService : GenderService,
               private readonly route : ActivatedRoute,
               private readonly router : Router,            
               private readonly snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=> {
        this.adherentId = params.get("id");}
    )
    if(this.adherentId){
      //Si la route contient "Add"
      
      if(this.adherentId.toLowerCase() ==='add'.toLowerCase()){
// ==> news Adherent fonctionnalités
          this.setImage();
          this.isNewAdherent =true;
          this.header ="Add new Adherent";
          
      }else{
      //  Existing Adherent functionnality
          this.isNewAdherent = false;
          this.header ="Edit Adherent";
          this.adherentService.getAdherent(this.adherentId).subscribe(
            (successResponse)=>{
             this.adherent = successResponse;
             this.setImage();
            },(errorResponse)=>{
              this.setImage();
            }
          );
      }
      this.genderService.getGenders().subscribe(
        (successResponse)=>{
            this.genderList = successResponse;
         }
      );
    }
    
  }


  onUpdate():void{
    console.log(this.adherent)
 // Call adherentService to update adherent
   this.adherentService.updateAdherent(this.adherent.id,this.adherent).subscribe(
    (sucessResponse)=> {
      //Show a notification
        this.snackbar.open("adherent updated successfully",undefined,{
          duration: 2000,
        });
    }, (errorResponse)=>{
      // Log it
    }
   )
  }

  onDelete():void{

  }

  onAdd():void{
    this.adherentService.addAdherent(this.adherent).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        setTimeout(()=>{
          this.router.navigateByUrl(`adherent/${successResponse.id}`);
        });
        this.snackbar.open("adherent added successfully",undefined,{
          duration: 2000,
        });
       
        
      },
      (errorResponse)=>{
             // Logs 
             console.log(errorResponse);
      }
    );
  }

  uploadImage(event : any):void{
      if(this.adherentId){
        const file: File = event.target.files[0];
        this.adherentService.uploadImage(this.adherent.id,file)
        .subscribe((successResponse)=>{
          this.adherent.profileImage = successResponse;
          this.setImage();
          //Show une notification
          this.snackbar.open('Profile Image Updated', undefined,{duration:2000})
        }) 
      }
  }

  private setImage():void{
if(this.adherent.profileImage){
  // Fetch the image by url
this.displayProfileImageUrl= 
this.adherentService.getImagePath(this.adherent.profileImage);
}
else{
  // display a default
  this.displayProfileImageUrl;
}
  }
}
