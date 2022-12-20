import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Adherent } from 'src/app/Model/adherent';
import { AddAdherent } from 'src/app/Model/ui-models/addAdherent';
import { UpdateAdherent } from 'src/app/Model/ui-models/updateAdherent';
@Injectable({
  providedIn: 'root'
})
export class AdherentService {

 // private baseApiUrl ="https://localhost:5001/api/Adherent";

  private baseApiUrl ="http://localhost:8080/api/adherent";
  constructor(private httpClient : HttpClient) { }

  getAdherents():Observable<Adherent[]>{
  return  this.httpClient.get<Adherent[]>(this.baseApiUrl);
  }
  
  getAdherent(adherentId : string):Observable<Adherent>{
    return  this.httpClient.get<Adherent>(this.baseApiUrl + "/"+ adherentId);
    }

  updateAdherent(adherentId : string, adherentUpdate : Adherent):Observable<Adherent>{
    const updateAdherent : UpdateAdherent ={

      firstName : adherentUpdate.firstName,
      lastName : adherentUpdate.lastName,
      dateOfBirth : adherentUpdate.dateOfBirth,
      email : adherentUpdate.email,
      poid: adherentUpdate.poid,
      mobile : adherentUpdate.mobile,
      genderId : adherentUpdate.genderId,
      physicalAdresse : adherentUpdate.adresse.physicalAdresse,
      postalAdresse :adherentUpdate.adresse.postalAdresse

    }
    return this.httpClient.put<Adherent>(this.baseApiUrl+"/"+adherentId,updateAdherent);
  }
  
  addAdherent(newAdherent : Adherent):Observable<Adherent>{
    const addAdherent : AddAdherent ={

      firstName : newAdherent.firstName,
      lastName : newAdherent.lastName,
      dateOfBirth : newAdherent.dateOfBirth,
      email : newAdherent.email,
      poid: newAdherent.poid,
      mobile : newAdherent.mobile,
      genderId : newAdherent.genderId,
      physicalAdresse : newAdherent.adresse.physicalAdresse,
      postalAdresse :newAdherent.adresse.postalAdresse

    }
    return this.httpClient.post<Adherent>(this.baseApiUrl+"/add",addAdherent);
  }

  uploadImage(adherentId:string , file:File):Observable<any>{
      const formData = new FormData();
      formData.append("profileImage", file);
    return  this.httpClient.post(this.baseApiUrl+ '/'+ adherentId+'/upload-image',
          formData,{
            responseType:'text'
          });
  }

  getImagePath(relativePath: string){
    return ` https://localhost:5001/${relativePath}`;
  }
}
