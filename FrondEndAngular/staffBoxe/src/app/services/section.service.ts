import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Section } from '../common/section';
import { SectionUpdate } from '../common/sectionUpdate';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private baseUrlSection = environment.UrlSection;
 
  constructor(private httpClient : HttpClient) { }
  
  getSectionList():Observable<Section[]>{
    const SectionUrl = `${this.baseUrlSection}`;
    return this.httpClient.get<Section[]>(SectionUrl);
  }

  getSectionById(sectionId : number):Observable<Section>{
    const SectionUrl = `${this.baseUrlSection}/${sectionId}`;
    return this.httpClient.get<Section>(SectionUrl);
  }

  putUpdateSection(sectionId: number, section : SectionUpdate):Observable<Section>{
    const updateSectionUrl = `${this.baseUrlSection}/update/${sectionId}`;
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type': 'application/Json'})}
    const updateSection : SectionUpdate = {    
      name: section.name,
      description : section.description,
      sectionId : section.sectionId,
      content :section.content,
      imageUrl: section.imageUrl,
      tarif : section.tarif    
    }
     return this.httpClient.put<Section>(updateSectionUrl,updateSection,httpOptions);
  }
}
