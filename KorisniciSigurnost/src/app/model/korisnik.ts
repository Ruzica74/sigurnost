import { Direktorijum } from "./direktorijum";

export enum Role{
    ADMINS, ADMIND, KLIJENT
}
export class Korisnik{
    id : number = 0;
    ime : string = '';
    prezime : string ='';
    korisnickoIme : string ='';
    role : Role = Role.KLIJENT;
    direktorijum: Direktorijum = new Direktorijum();
    read :Boolean = true;
    delete :Boolean = true;
    update :Boolean = true;
    create :Boolean = true ;
}