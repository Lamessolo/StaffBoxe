import { Order } from "./order";
import { OrderHistory } from "./orderHistory";

export class PaginationForOrderHistory{
    constructor(){}

    content:OrderHistory[]=[]
    pageNo: number | null| undefined;
    pageSize!: number;
    totalElements!: number;
    totalPages!:number;
    last!: boolean;
}