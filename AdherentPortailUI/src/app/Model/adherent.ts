import { Adresse } from "./adresse";
import { Gender } from "./gender";

export interface Adherent{
    id : string,
    firstName: string;
    lastName:string;
    mobile: number,
    poid:number,
    email: string,
    profileImage:string,
    dateOfBirth:string,
    genderId:string,
    gender:Gender,
    adresse : Adresse
}