import { Adresse } from "../ui-models/adresse";
import { Gender } from "../ui-models/gender";


export interface Adherent{
    id : string,
    firstName: string;
    lastName:string;
    mobile: number,
    email: string,
    poid: number,
    profileImage:string,
    dateOfBirth:string,
    genderId:string,
    gender:Gender,
    adresse : Adresse
}