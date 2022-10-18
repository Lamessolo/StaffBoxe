import { HttpClient } from '@angular/common/http';
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

 /* getHome(page :number,size: number,field :string):Observable<Adherent[]>{
    const searchUrl = `${this.baseUrlAdherent}/all?page=${page}&size=${size}&field=${field}`;
    return this.httpClient.get<Adherent[]>(searchUrl);
  }*/

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
}
