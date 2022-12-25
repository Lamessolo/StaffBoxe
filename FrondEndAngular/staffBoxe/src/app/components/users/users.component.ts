import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users : User[]=[];
filterString="";
displayedColumns: string[] = ['name','email','phone','edit'];
dataSource : MatTableDataSource<User> = new MatTableDataSource<User>() ;
@ViewChild(MatPaginator) matPaginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (successResponse)=>{
        console.log(successResponse)
        this.users = successResponse.content;
        this.dataSource =  new MatTableDataSource<User>(this.users);
      if(this.matPaginator){
        this.dataSource.paginator = this.matPaginator;
      }
      if(this.matSort){
        this.dataSource.sort = this.matSort;
      }
      },(error)=>{

      }
      
    )
  }

filterUsers(){
    this.dataSource.filter = this.filterString.trim().toLowerCase(); 
  }
}
