import { User } from "./user";

export class PaginationForUser{
    constructor(){}

    content:User[]=[]
    pageNo: number | null| undefined;
    pageSize!: number;
    totalElements!: number;
    totalPages!:number;
    last!: boolean;
}