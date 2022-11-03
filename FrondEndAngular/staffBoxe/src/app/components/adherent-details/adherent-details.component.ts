import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { AdherentService } from 'src/app/services/adherent.service';

@Component({
  selector: 'app-adherent-details',
  templateUrl: './adherent-details.component.html',
  styleUrls: ['./adherent-details.component.css']
})
export class AdherentDetailsComponent implements OnInit {

  adherent! : Adherent;
  constructor(private adherentService : AdherentService, 
              private route : ActivatedRoute, private router : Router) { }
               
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleAdherentDetails();
    });

  }

  handleAdherentDetails(){
    const theAdherentId : number = +this.route.snapshot.paramMap.get('id')!;
   
    this.adherentService.getAdherentById(theAdherentId).subscribe(
      data => {
        this.adherent = data ;
      }
    )

  }

  goToListAdherent(){
    this.router.navigate(['/adherents']);
  }

   delete(adherentId : number):void{
    this.adherentService.deleteAdherent(adherentId).subscribe(data =>{
      console.log(data);
      this.goToListAdherent();
    },  error =>console.log(error));
}
  

}
