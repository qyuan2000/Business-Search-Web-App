export interface Reservation {
    id?:string;
    name?: string;
    date?:string;
    time?: string;
    email?:string;
}

export interface ReservationList{
    list?: Reservation[];
}
