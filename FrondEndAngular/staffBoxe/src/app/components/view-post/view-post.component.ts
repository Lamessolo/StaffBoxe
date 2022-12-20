import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/common/post';
import { PostUpdate } from 'src/app/common/postUpdate';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId : number| null | undefined;
  post : PostUpdate ={
    id: 0,
    titre: '',
    description: '',
    content: '',
    publicationDate: Date(),
    imagePostUrl: ''
  }
  constructor(private readonly postService : PostService, 
        private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
     if(this.postId) {
      this.postService.getPostById(this.postId).subscribe(
        (sucessResponse)=>{
          this.post = sucessResponse;
        });
     }
  }

  onUpdate(): void{
    this.postService.putUpdatePost(this.post.id,this.post).subscribe(
      (successResponse)=>{
        console.log(successResponse);
      }
    );
  }
}
