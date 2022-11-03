import { Adherent } from "./adherent";

export class Pagination{
    constructor(){}

    content!:Adherent[]
    pageNo!: number;
    pageSize!: number;
    totalElements!: number;
    totalPages!:number;
    last!: boolean;
}
