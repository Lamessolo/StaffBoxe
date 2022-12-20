import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../common/post';
import { PostUpdate } from '../common/postUpdate';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrlPost = environment.UrlPost;
  constructor(private httpClient : HttpClient) { }

  getPostList():Observable<any>{
    const getPostUrl =`${this.baseUrlPost}`;
    return this.httpClient.get<any>(getPostUrl);
  }

  getPostById(thePostId: number):Observable<Post>{
  
    const searchUrl = `${this.baseUrlPost}/${thePostId}`;
    return this.httpClient.get<Post>(searchUrl);
  }

  putUpdatePost(postId: number, post: PostUpdate):Observable<Post>{
    const updateUrl = `${this.baseUrlPost}/${postId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
     return this.httpClient.put<Post>(updateUrl,post,httpOptions);
  }
  /*
  updatePost(post:Post,postId:number):Observable<Post>{
    const updateUrl = `${this.baseUrlPost}/${postId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
     return this.httpClient.put<Post>(updateUrl,post,httpOptions);
  }
  */
}
