import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adherent } from '../common/adherent';
import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  private baseUrlAdherent ="http://managerstaffboxe.herokuapp.com/api/adherent";

  private UrlSection ="http://managerstaffboxe.herokuapp.com/api/section/all";




  constructor(private httpClient : HttpClient) { }

  getHome(page :number,size: number,field :string):Observable<Adherent[]>{
    const searchUrl = `${this.baseUrlAdherent}/all?page=${page}&size=${size}&field=${field}`;
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
    const SectionUrl = `${this.UrlSection}`;
    return this.httpClient.get<Section[]>(SectionUrl);
  }

  searchAdherent(theKeyWord :string):Observable<Adherent[]>{
    const searchUrl = `${this.baseUrlAdherent}/search/${theKeyWord}`;
    return this.httpClient.get<Adherent[]>(searchUrl);

  }
}
