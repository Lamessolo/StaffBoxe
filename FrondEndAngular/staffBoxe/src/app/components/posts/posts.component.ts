import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/common/post';
import { PostService } from 'src/app/services/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  displayedColumns: string[] = ['titre', 'publicationDate',
  'description', 'imagePostUrl','edit'];
  dataSource : MatTableDataSource<Post> = new MatTableDataSource<Post>();
  @ViewChild(MatPaginator) matPinator!:MatPaginator
  @ViewChild(MatSort) matSort!:MatSort
 filterString = '';
  constructor(private postService : PostService) { }

  ngOnInit(): void {

    this.postService.getPostList().subscribe(
      (successResponse)=>{
        this.posts = successResponse.content;
        this.dataSource = new MatTableDataSource<Post>(this.posts);
        if(this.matPinator){
          this.dataSource.paginator=this.matPinator;
        }

        if(this.matSort){
          this.dataSource.sort=this.matSort;
        }
      
      },(errorResponse)=>{
        console.log(errorResponse);
      }
    );
  }

  filterPosts(){
    this.dataSource.filter =this.filterString.trim().toLowerCase()
  }
}
