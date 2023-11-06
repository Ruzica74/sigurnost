import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleServiceService } from './google-service.service';
import {Prijava} from '../model/prijava'
import { CuvanjeServiceService } from './cuvanje-service.service';
import { Korisnik } from '../model/korisnik';
import { Fajl } from '../model/fajl';
import { Direktorijum } from '../model/direktorijum';
import { Logovi } from '../model/logovi';

@Injectable({
  providedIn: 'root'
})
export class PodaciServiceService {
  

  constructor(private http:HttpClient, private cuvanjeService : CuvanjeServiceService) { 
    
  }

  public prijava(podaci:Prijava){
    return this.http.post("https://localhost:8433/logind", podaci);
  }

  public googlePrijava(mail:String){
    var info = {
      "mail" : mail
    }
    return this.http.post("https://localhost:8433/loginWithGoogle", info)
  }

  public getDirektorijums( id: number, token :string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/dir/dirs/"+id, httpOptions1)
  }

  public getFajls( id: number, token :string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/dir/fajls/"+id, httpOptions1)
  }

  public getDirektorijum(id: number, token :string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/dir/"+id, httpOptions1)
  }

  public getFajlText(idFajl: number, token: string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/fajl/sadrzaj/"+idFajl, httpOptions1)
  }

  public updateFajl(idFajla: number, text: string, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    console.log('text fajla prije slanja: '+text)

    return this.http.put("https://localhost:8433/fajl/izmjeni/"+idFajla, text, httpOptions1)
  }

  public addFajl(file:Fajl, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.post("https://localhost:8433/fajl/add", file, httpOptions1)
  }

  public addFajlContent(id:number, text:string, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.post("https://localhost:8433/fajl/newFileContent/"+id, text, httpOptions1)
  }

  public deleteFajl(id : number, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.delete("https://localhost:8433/fajl/"+id, httpOptions1)
  }

  public deleteDir(id : number, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.delete("https://localhost:8433/dir/"+id, httpOptions1)
  }

  public moveFajl(id: number, fajl: Fajl, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.put("https://localhost:8433/fajl/premjesti/"+id, fajl, httpOptions1)
  }

  public addDir(dir : Direktorijum, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.post("https://localhost:8433/dir/add", dir, httpOptions1)
  }

  public logAktivnost(log : Logovi, token : string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.post("https://localhost:8433/log/add", log, httpOptions1)
  }

  public getAllAktivnosti(token : string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/log/all", httpOptions1)
  }

  public getNotifikacije(token : string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/log/notifikacije", httpOptions1)
  }

  public setPregledano(id: number,log:Logovi ,token : string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.put("https://localhost:8433/log/update/"+id,log, httpOptions1)
  }

  public sendSms(id: number, token:string){
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token,
      })
    };
    return this.http.get("https://localhost:8433/sendSms/"+id,httpOptions1)
  }
  
}


