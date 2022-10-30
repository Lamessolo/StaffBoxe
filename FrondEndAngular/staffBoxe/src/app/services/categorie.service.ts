import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../common/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrlCategorie = environment.UrlCategorie;
  constructor(private httpClient : HttpClient) { }

  
  getCategorieList():Observable<Categorie[]>{
    const CategorieUrl = `${this.baseUrlCategorie}/all`;
    return this.httpClient.get<Categorie[]>(CategorieUrl);
  }

  getCategorieById(CategorieId: number):Observable<Categorie>{
    const CategorieByIdUrl = `${this.baseUrlCategorie}/${CategorieId}`;
    return this.httpClient.get<Categorie>(CategorieByIdUrl);
  }
}
