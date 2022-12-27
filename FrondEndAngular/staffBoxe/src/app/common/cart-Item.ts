import { Section } from "./section";

export class CartItem{
    id! : number;
    name!: string;
    imageUrl!: string;
    unitPrice!: number;
   // imageUrl: string;  
    quantity! : number;

    constructor(section: Section){
        this.id = section.id;
        this.name = section.name;
        this.imageUrl = section.imageUrl;
        this.unitPrice = section.tarif;
        this.quantity = 1;
    }
}