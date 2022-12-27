import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adherent } from '../common/adherent';
import { AdherentAdd } from '../common/adherentAdd';
import { AdherentUpdate } from '../common/adherentUpdate';
import { Pagination } from '../common/pagination';
import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  private baseUrlAdherent = environment.UrlAdherent;
  private baseUrlSection = environment.UrlSection;
  private baseUrlFile = environment.UrlFile;
  constructor(private httpClient : HttpClient) { }

  getHome():Observable<Pagination>{
    const searchUrl = `${this.baseUrlAdherent}/all`;
    return this.httpClient.get<Pagination>(searchUrl);
  }
  getAdherentById(theAdherentId: number):Observable<Adherent>{
  
    const searchUrl = `${this.baseUrlAdherent}/${theAdherentId}`;
    return this.httpClient.get<Adherent>(searchUrl);
  }
  
  getAdherentList(theSectionId : number):Observable<Adherent[]>{
    const searchUrl = `${this.baseUrlAdherent}/section/${theSectionId}`;
    return this.httpClient.get<Adherent[]>(searchUrl);
   
  }

  getSectionList():Observable<Section[]>{
    const SectionUrl = `${this.baseUrlSection}`;
    return this.httpClient.get<Section[]>(SectionUrl);
  }

  searchAdherent(theKeyWord :string):Observable<Adherent[]>{
    const searchUrl = `${this.baseUrlAdherent}/search/${theKeyWord}`;
    return this.httpClient.get<Adherent[]>(searchUrl);

  }

   deleteAdherent(idAdherent:number):Observable<any>{
    const deleteUrl = `${this.baseUrlAdherent}/delete/${idAdherent}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    return this.httpClient.delete<string>(deleteUrl,httpOptions);
  }
  
  putUpdateAdherent(adherentId: number, adherent: Adherent):Observable<Adherent>{
    const updateUrl = `${this.baseUrlAdherent}/update/${adherentId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    const updateAdherent : AdherentUpdate = {    
      name: adherent.name,
      prenom: adherent.prenom,
      adresse: adherent.adresse,
      email: adherent.email,
      phone: adherent.phone,
      imageUrl: adherent.imageUrl,
      statut: adherent.statut,
      poid: adherent.poid,
      dateNaissance: adherent.dateNaissance,
      sexe: adherent.sexe.id,
      section: adherent.section.id,
      categorie: adherent.categorie.id
    }

     return this.httpClient.put<Adherent>(updateUrl,updateAdherent,httpOptions);
  }
  
  addAdherent(adherent : Adherent):Observable<Adherent>{
    
    const addUrl = `${this.baseUrlAdherent}/add`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
    const addAdherent : AdherentAdd = {    
      name: adherent.name,
      prenom: adherent.prenom,
      adresse: adherent.adresse,
      email: adherent.email,
      phone: adherent.phone,
      imageUrl: adherent.imageUrl,
      statut: adherent.statut,
      poid: adherent.poid,
      dateNaissance: adherent.dateNaissance,
      sexe: adherent.sexe.id,
      section: adherent.section.id,
      categorie: adherent.categorie.id
    }
   return this.httpClient.post<Adherent>(addUrl,addAdherent,httpOptions);
  }

  uploadImage(adherentId: number,file:File ):Observable<any>{
      const formData = new FormData();
      formData.append("profileImage", file);
    return  this.httpClient.post(this.baseUrlFile+ '/'+ adherentId,
          formData,{
            responseType:'text'            
          });
  }

/*  getImagePath(relativePath: string){
    return ` https://localhost:5001/${relativePath}`;
  }
  */
}

 
  

