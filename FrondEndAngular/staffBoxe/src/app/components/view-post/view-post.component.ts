import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/common/post';
import { PostUpdate } from 'src/app/common/postUpdate';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  
  postId : string| null | undefined;
  post : Post ={
    id: 0,
    titre: '',
    description: '',
    content: '',
    publicationDate:new Date('2022-06-09'),
    imagePostUrl: ''
  }
  isNewPost = true;
  header = '';
  constructor(private readonly postService : PostService,
    private snackbar:MatSnackBar, 
    private router: Router,
        private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    if(this.postId){     
      //If the route contains the 'Add'
      if(this.postId.toString().toLowerCase()=== 'Add'.toLowerCase()){
        // New student fonctionnality
           this.isNewPost = true;
           this.header ="Add New Post";
      }else{
        // Existing adherent functionnality
          this.isNewPost = false;
          this.header ="Update Post";
      }
      this.loadPostById();
      }    
  }

  loadPostById(){
    const idPost : number = +this.route.snapshot.paramMap.get('id')!;
  
    this.postService.getPostById(idPost).subscribe(
      (sucessResponse)=>{
        this.post = sucessResponse;
      }
    );
  }  

  onUpdate(): void{
    this.postService.putUpdatePost(this.post.id,this.post).subscribe(
      (successResponse)=>{
       //Show notification
       this.snackbar.open('Adherent updated successfully', undefined,
       {duration: 2500});
       setTimeout(()=>{
        this.router.navigateByUrl('posts');
       }, 2500);
      
 console.log(successResponse);
     },(error)=>{
 
     }) ; 
  }

  onDelete():void{
    this.postService.postDeletePost(this.post.id).subscribe(
      (successResponse)=>{
         //Show notification
         this.snackbar.open('Post deleted successfully', undefined,
         {duration: 2500});
    
         setTimeout(()=>{
          this.router.navigateByUrl('posts');
         }, 2500);
        
        console.log(successResponse);
      },(error)=>{
    
      }
     );
  }

  onAdd():void{
    this.postService.addPost(this.post).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        //Show notification
        this.snackbar.open('Post created successfully', undefined,
        {duration: 2500});
    
        setTimeout(()=>{
         this.router.navigateByUrl('posts');
        }, 3000);
       
      
     },(error)=>{
    console.log(error);
     }
     );
  }
}
