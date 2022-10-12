import { Categorie } from "./categorie";
import { Section } from "./section";
import { Sexe } from "./sexe";

export class Adherent {

    constructor(
       public id: number,
       public adherentId: string,
       public name : string,
       public prenom : string,
       public adresse : string,
       public email : string,
       public phone : string,
       public imageUrl : string,
       public statut: string,
       public poid : number,
       public dateCreation : Date,
       public dateUpdate : Date,
       public sexe :Sexe,
       public section: Section,
       public categorie : Categorie

    ){}
}