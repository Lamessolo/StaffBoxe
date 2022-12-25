import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../common/post';
import { PostAdd } from '../common/postAdd';
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

  putUpdatePost(postId: number, post: Post):Observable<Post>{
    const updateUrl = `${this.baseUrlPost}/${postId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    const updatePost : PostUpdate = { 	
    titre : post.titre,		
    description: post.description,		
    publicationDate : post.publicationDate,
    content: post.content,	
    imagePostUrl: post.imagePostUrl
    }

     return this.httpClient.put<Post>(updateUrl,updatePost,httpOptions);
  }
  
  postDeletePost(idPost: number){
    const deleteUrl = `${this.baseUrlPost}/${idPost}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    return this.httpClient.delete<string>(deleteUrl,httpOptions);
  }

  addPost(post : Post):Observable<Post>{
    const addUrl = `${this.baseUrlPost}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    const addPost : PostAdd = {    
      titre: post.titre,
      description: post.description,
      publicationDate: post.publicationDate,
      content: post.content,
      imagePostUrl: post.imagePostUrl      
    }
   return this.httpClient.post<Post>(addUrl,addPost,httpOptions);
  }
}
