import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
userId : string | null | undefined;
header ="";
 user: User={
   id: 0,
   name: '',
   email: '',
   phone: '',
   lastname: ''
 }
 isNewUser = false;
  constructor(private readonly userService : UserService,
              private snackbar:MatSnackBar, 
              private router: Router,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {

  this.userId = this.route.snapshot.paramMap.get('id')!;
      if(this.userId){     
        //If the route contains the 'Add'
        if(this.userId.toString().toLowerCase()=== 'Add'.toLowerCase()){
          // New student fonctionnality
             this.isNewUser = true;
             this.header ="Add New User";
        }else{
          // Existing adherent functionnality
            this.isNewUser = false;
            this.header ="Update Student";
        }
        this.getUserById();
        }
  }

  getUserById(){
    const idUser : number = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(idUser).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        this.user = successResponse;
      }
    );
  }

  onUpdate(){
    const idUser : number = +this.route.snapshot.paramMap.get('id')!;
    this.userService.UpdateUser(idUser,this.user).subscribe(
      (successResponce)=>{
          //Show notification
          this.snackbar.open('User updated successfully', undefined,
          {duration: 2500});
          setTimeout(()=>{
            this.router.navigateByUrl('users');
          }, 2500);
      });
  }

onAdd(){
    this.userService.addUser(this.user).subscribe(
      (successResponce)=>{
          //Show notification
          this.snackbar.open('User create successfully', undefined,
          {duration: 2000});
          setTimeout(()=>{
            this.router.navigateByUrl('users');
          }, 2500);
      },(error)=>
      {
         //Show notification
         this.snackbar.open('User not created', undefined,
         {duration: 2000});
        
      }
    )
  }
  onDelete(){
    const idUser : number = +this.route.snapshot.paramMap.get('id')!;
    this.userService.deleteUser(idUser).subscribe(
      (successResponce)=>{
          //Show notification
          this.snackbar.open('User delete successfully', undefined,
          {duration: 2000});
          setTimeout(()=>{
            this.router.navigateByUrl('users');
          }, 2500);
      },(error)=>
      {
         //Show notification
         this.snackbar.open('User not delete', undefined,
         {duration: 2000});
        
      }
    )

  }
}
