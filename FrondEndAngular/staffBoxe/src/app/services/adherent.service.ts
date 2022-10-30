import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adherent } from '../common/adherent';
import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  private baseUrlAdherent = environment.UrlAdherent;
  private baseUrlSection = environment.UrlSection;
  
  constructor(private httpClient : HttpClient) { }

  getHome():Observable<Adherent[]>{
    const searchUrl = `${this.baseUrlAdherent}/all`;
    return this.httpClient.get<Adherent[]>(searchUrl);
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
  
  
  updateAdherent(adherent:Adherent,adherentId:number):Observable<Adherent>{
    const updateUrl = `${this.baseUrlAdherent}/update/${adherentId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
     return this.httpClient.put<Adherent>(updateUrl,adherent,httpOptions);
  }

  addAdherent(adherent : Adherent):Observable<Object>{
    
    const addUrl = `${this.baseUrlAdherent}/add`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})
    }
   return this.httpClient.post(addUrl,adherent,httpOptions);
  }
  }

