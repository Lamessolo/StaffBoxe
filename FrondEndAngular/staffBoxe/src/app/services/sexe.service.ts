import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sexe } from '../common/sexe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SexeService {

  private baseUrlSexe = environment.UrlSexe;
  constructor(private httpClient : HttpClient) { }

  getSexeList():Observable<Sexe[]>{
    const SexeUrl = `${this.baseUrlSexe}/all`;
    return this.httpClient.get<Sexe[]>(SexeUrl);
  }

  getSexeById(SexeId: number):Observable<Sexe>{
    const SexeByIdUrl = `${this.baseUrlSexe}/${SexeId}`;
    return this.httpClient.get<Sexe>(SexeByIdUrl);
  }

}
