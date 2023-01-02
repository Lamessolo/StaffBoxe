import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationForUser } from '../common/paginationForUser';
import { User } from '../common/user';
import { UserAdd } from '../common/userAdd';
import { UserUpdate } from '../common/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrlUser = environment.UrlUser;
  constructor(private httpClient : HttpClient) { }


  getAllUsers():Observable<PaginationForUser>{
    const searchUrl = `${this.baseUrlUser}`;
    return this.httpClient.get<PaginationForUser>(searchUrl);
  }

  getUserById(userId: number):Observable<User>{
  
    const searchUrl = `${this.baseUrlUser}/${userId}`;
    return this.httpClient.get<User>(searchUrl);
  }

  UpdateUser(userId: number, user: User):Observable<User>{
    const updateUrl = `${this.baseUrlUser}/update/${userId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    const updateUser : UserUpdate = {    
      name: user.name.toUpperCase().trim(),     
      email: user.email,
      phone: user.phone,     
    }

     return this.httpClient.put<User>(updateUrl,updateUser,httpOptions);
  }

  addUser(user : User):Observable<User>{
    
    const addUrl = `${this.baseUrlUser}/add`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    const addUser : UserAdd = {
      name: user.name.trim().toUpperCase(),
      email: user.email,
      phone: user.phone,
      lastname: user.lastname

    }
   return this.httpClient.post<User>(addUrl,addUser,httpOptions);
  }
  
  deleteUser(idUser:number):Observable<any>{
    const deleteUrl = `${this.baseUrlUser}/delete/${idUser}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    return this.httpClient.delete<string>(deleteUrl,httpOptions);
  }
}
