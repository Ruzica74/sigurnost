import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fajl } from '../model/fajl';
import { Korisnik } from '../model/korisnik';

@Injectable({
  providedIn: 'root'
})
export class CuvanjeServiceService {

  private token = '';
  private korisnik = new Korisnik();
  private text = '';
  private izbor : number = 0;
  private otvoreniFajl : number = 0;

  constructor() { }

  setToken(mes: string){
    localStorage.setItem('token', JSON.stringify(mes))
  }

  setKorisnik(kor: Korisnik){
    localStorage.setItem('korisnik', JSON.stringify(kor))
  }

  setText(text: string){
    localStorage.setItem('text', JSON.stringify(text))
  }

  setIzbor(izbor: number){
    localStorage.setItem('izbor', JSON.stringify(izbor))
  }

  setOtvoreniFajl(f: Fajl){
    localStorage.setItem('fajlId', JSON.stringify(f))
  }

  setLokacijaDir(lokacija: string, naziv: string){
    var lok;
    if(lokacija.endsWith('\\')){
      lok=lokacija+naziv;
    }
    else{
      lok=lokacija+'\\'+naziv;
    }
    localStorage.setItem('lokacija', JSON.stringify(lok))
  }

  setdirektorijumIdAddFile(id: number){
    localStorage.setItem('dirId', JSON.stringify(id))
  }

  setDaLiJeNoviDir(dir : boolean){
    localStorage.setItem('daLiJeDir', JSON.stringify(dir))
  }

  getDaLiJeNoviDir(){
    var m=localStorage.getItem("daLiJeDir");
    var lok=m!=null ? JSON.parse(m) : null;
    return lok;
  }

  getdirektorijumIdAddFile(){
    var m=localStorage.getItem("dirId");
    var lok=m!=null ? JSON.parse(m) : null;
    return lok;
  }

  getLokacijaDir(){
    var m=localStorage.getItem("lokacija");
    var lok=m!=null ? JSON.parse(m) : null;
    return lok;
  }

  getOtvoreniFajl(){
    var m=localStorage.getItem("fajlId");
    var l=m!=null ? JSON.parse(m) : null;
    return l;
  }

  getIzbor(){
    var m=localStorage.getItem("izbor");
    this.izbor=m!=null ? JSON.parse(m) : null;
    return this.izbor;
  }

  getText(){
    var m=localStorage.getItem("text");
    this.text=m!=null ? JSON.parse(m) : null;
    return this.text;
  }

  getToken(){
    var m=localStorage.getItem("token");
    this.token=m!=null ? JSON.parse(m) : null;
    return this.token;
  }

  getKorisnik(){
    var m=localStorage.getItem("korisnik");
    this.korisnik=m!=null ? JSON.parse(m) : null;
    return this.korisnik;
  }
}


