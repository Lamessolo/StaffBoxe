import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Reactive JavaScript framework
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private baseUrlCountry = environment.UrlCountry;
  private baseUrlState = environment.UrlState;
  constructor(private httpClient  : HttpClient) { }

  getCreditCardMonths(startMonth: number):Observable<number[]>{
 let data:number[] = [];
 // Build an array for Month dropdown list
 // - start at current month and loop until 

 for(let theMonth = startMonth; theMonth <= 12; theMonth++){
  data.push(theMonth)
 }

 return of (data);
  }

  getCreditCardYears():Observable<number[]>{
    let data:number[] = [];
     // Build an array for "Years" dropdown list
     // - start at current year and loop for next 10 years
     
     const startYear : number = new Date().getFullYear();
     const endYear : number = startYear + 10;

     for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);     
     }

     return of(data);
  }

  getAllCountries():Observable<Country[]>{
    const searchUrl = `${this.baseUrlCountry}`;
    return this.httpClient.get<Country[]>(searchUrl);
  }

getStates(theCountryCode : string):Observable<State[]>{

  const searchUrl = `${this.baseUrlState}/search/${theCountryCode}`;
  return this.httpClient.get<State[]>(searchUrl);
}



}
