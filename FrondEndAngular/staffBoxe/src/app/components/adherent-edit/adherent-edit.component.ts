import { Component, OnInit } from '@angular/core';
import { Adherent } from 'src/app/common/adherent';
import { AdherentService } from 'src/app/services/adherent.service';

@Component({
  selector: 'app-adherent-edit',
  templateUrl: './adherent-edit.component.html',
  styleUrls: ['./adherent-edit.component.css']
})
export class AdherentEditComponent implements OnInit {

  adherent! : Adherent ;
  theAdherentId: number = 1;
  constructor(private adherentService : AdherentService,
               ) { }

  ngOnInit(): void {
    this.loadAdherent();
  }

  loadAdherent(){
   this.adherentService.getAdherentById(this.adherent.id).subscribe(data =>{
    this.adherent = data ;
   });
  }
}
