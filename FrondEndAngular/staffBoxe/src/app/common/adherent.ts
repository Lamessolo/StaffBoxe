import { Categorie } from "./categorie";
import { Section } from "./section";
import { Sexe } from "./sexe";
export interface Adherent{
   id : number;
   name: string;
   prenom: string;
   adresse: string;
   email: string;
   phone: string;
   imageUrl: string;
   statut: string;
   poid: number;
   dateNaissance : Date;
   sexe: Sexe;
   section: Section;
   categorie: Categorie;

}
