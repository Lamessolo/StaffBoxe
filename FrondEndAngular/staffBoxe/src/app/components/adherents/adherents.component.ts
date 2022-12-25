import { createViewChild } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Adherent } from 'src/app/common/adherent';
import { AdherentService } from 'src/app/services/adherent.service';

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrls: ['./adherents.component.css']
})
export class AdherentsComponent implements OnInit {
  adherents : Adherent[]=[];
  filterString="";
  displayedColumns: string[] = ['imageUrl','name','prenom',
  'dateNaissance','sexe','poid','email','section','phone','edit'];
  dataSource : MatTableDataSource<Adherent> = new MatTableDataSource<Adherent>() ;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(private adherentService: AdherentService) { }

  ngOnInit(): void {
    this.adherentService.getHome().subscribe((successResponse)=>{
      console.log(successResponse.content);
      this.adherents = successResponse.content; 
      this.dataSource =  new MatTableDataSource<Adherent>(this.adherents);
      if(this.matPaginator){
        this.dataSource.paginator = this.matPaginator;
      }
      if(this.matSort){
        this.dataSource.sort = this.matSort;
      }
    },(errorResponse)=>{
      console.log(errorResponse);
    }
    );
  }

  filterAdherents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase(); 
  }

}
