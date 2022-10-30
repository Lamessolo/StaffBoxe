import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdherentService } from 'src/app/services/adherent.service';

@Component({
  selector: 'app-adherent-add',
  templateUrl: './adherent-add.component.html',
  styleUrls: ['./adherent-add.component.css']
})
export class AdherentAddComponent implements OnInit {

  constructor(private adherentService : AdherentService, 
    private route : ActivatedRoute, private router : Router) { }

    
  ngOnInit(): void {

  }

}
