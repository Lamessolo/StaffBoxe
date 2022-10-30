import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private UrlSection = environment.UrlSection;
 
  constructor(private httpClient : HttpClient) { }
  
  getSectionList():Observable<Section[]>{
    const SectionUrl = `${this.UrlSection}`;
    return this.httpClient.get<Section[]>(SectionUrl);
  }
}
