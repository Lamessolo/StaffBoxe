import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private UrlSection ="http://localhost:8080/api/section/all";

  constructor(private httpClient : HttpClient) { }
  
  getSectionList():Observable<Section[]>{
    const SectionUrl = `${this.UrlSection}`;
    return this.httpClient.get<Section[]>(SectionUrl);
  }
}
