import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Direktorijum } from '../model/direktorijum';
import { Fajl } from '../model/fajl';
import { Item } from '../model/item';
import { Korisnik, Role } from '../model/korisnik';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';
import { saveAs } from 'file-saver';
import { Logovi } from '../model/logovi';


@Component({
  selector: 'app-glavna',
  templateUrl: './glavna.component.html',
  styleUrls: ['./glavna.component.css']
})
export class GlavnaComponent implements OnInit {
  korisnik : Korisnik = new Korisnik()
  token : string = ''
  dir : Direktorijum = new Direktorijum();
  listaDir : Array<Direktorijum> = [];
  listaFajl : Array<Fajl> = [];
  trenutnaListaDir : Array<Direktorijum> = [];
  trenutnaListaFajl : Array<Fajl> = [];
  trenutniDir: Direktorijum = new Direktorijum();
  listaF : Array<Item> = []
  listaD = ['Obriši']
  idFajla: number =0
  fileUrl: SafeResourceUrl | undefined;
  izabraniFajl : Fajl = new Fajl();
  //upload ikonica: vertical_align_top
  menuTopLeftPosition =  {x: '0', y: '0'} 
  //@ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger | undefined; 
  @ViewChild('rightBrt', {static: true}) rightMenu: MatMenuTrigger | undefined; 
  @ViewChild('rightBtn', {static: true}) matMenuTrigger2: MatMenuTrigger | undefined; 
  

  constructor(private router: Router, 
    private servisPodaci : PodaciServiceService, private cuvanjeService : CuvanjeServiceService, private sanitizer: DomSanitizer) { 
      this.korisnik = this.cuvanjeService.getKorisnik();
      this.token = this.cuvanjeService.getToken();
      //console.log(this.korisnik);
      //console.log(this.token);
      if(this.korisnik.role.toString() == 'ADMINS'){
        this.listaF.push({naziv:'Pročitaj', ikonica:'chrome_reader_mode'})
            this.listaF.push( {naziv: 'Preuzmi', ikonica:'vertical_align_bottom'})
      }else{
        if(this.korisnik.role.toString() == 'KLIJENT'){
          if(this.korisnik.read){
            this.listaF.push({naziv:'Pročitaj', ikonica:'chrome_reader_mode'})
            this.listaF.push( {naziv: 'Preuzmi', ikonica:'vertical_align_bottom'})
          }
          if(this.korisnik.update){
            this.listaF.push({naziv:'Izmjeni', ikonica: 'edit'})
          }
          if(this.korisnik.delete){
            this.listaF.push({naziv:'Obriši', ikonica:'delete'})
          }
        }else{
          this.listaF.push({naziv:'Pročitaj', ikonica:'chrome_reader_mode'}, {naziv:'Izmjeni', ikonica: 'edit'}, {naziv:'Obriši', ikonica:'delete'}, {naziv: 'Preuzmi', ikonica:'vertical_align_bottom'})
        }
        //console.log("rola: "+this.korisnik.role)
        if(this.korisnik.role.toString() == 'ADMIND'){
          this.listaF.push({naziv: 'Premjesti', ikonica:'file_copy'})
          //console.log("rola: "+this.korisnik.role)
        }
      }
      this.servisPodaci.getDirektorijum(this.korisnik.direktorijum.id, this.token).subscribe((result: any)=>{
        //console.log(result)
        this.trenutniDir = result;
        this.dir = result;
      })
      this.servisPodaci.getDirektorijums(this.korisnik.direktorijum.id, this.token).subscribe((result: any)=>{
        //console.log(result)
        this.listaDir = result;   
        this.popuniTrenutniDir();
      })
      this.servisPodaci.getFajls(this.korisnik.direktorijum.id, this.token).subscribe((result: any)=>{
        //console.log(result)
        this.listaFajl = result;
        this.popuniTrenutniFajl();
      })    
  }

  ngOnInit(): void {  
    if(this.token == ''){
      this.router.navigateByUrl("");
    } 

  }

  pregledAktivnosti(){
    this.router.navigateByUrl('activity');
  }

  uzimanjeId(fajl: Fajl){
    this.idFajla = fajl.id;
    this.izabraniFajl = fajl;
    this.cuvanjeService.setOtvoreniFajl(fajl);
    //console.log("Idfajla je: "+this.idFajla);
  }

  popuniTrenutniDir(){
    this.trenutnaListaDir = []
    for(let c in this.listaDir){
      if(this.listaDir[c].lokacija.endsWith(this.trenutniDir.naziv)){
        this.trenutnaListaDir.push(this.listaDir[c]);
        //console.log('trenutni dir '+this.listaDir[c].naziv)
      }
    }
  }

  popuniTrenutniFajl(){
    this.trenutnaListaFajl = []
    for(let c in this.listaFajl){
      if(this.listaFajl[c].lokacija.endsWith(this.trenutniDir.naziv)){
        this.trenutnaListaFajl.push(this.listaFajl[c]);
        //console.log('trenutni fajl '+this.listaFajl[c].naziv)
      }
    }
  }



  nazad(){
    if(this.trenutniDir.id != this.dir.id){
      var lista = this.trenutniDir.lokacija.split('\\');
      var imeDir = lista[lista.length-1];
      //console.log("nazad: "+imeDir)
      for( let i in this.listaDir){
        //console.log(this.listaDir[i])
        if(this.listaDir[i].naziv == imeDir){
          var staraLokacija = this.listaDir[i].lokacija;
          if(!this.listaDir[i].lokacija.endsWith('\\')){
            staraLokacija += '\\'
          }
          staraLokacija += imeDir;
          //console.log("stara lokacija: "+staraLokacija)
          if(staraLokacija == this.trenutniDir.lokacija){
            this.trenutniDir = this.listaDir[i]
            this.popuniTrenutniDir()
            this.popuniTrenutniFajl()
          }

        }
      }
    }
  }

  klikDir(dir: Direktorijum){
    this.trenutniDir=dir;
    this.popuniTrenutniDir()
    this.popuniTrenutniFajl()
  }

  razrjesenjeDesnogKlika(naziv: string){
    //console.log('izabrano jee: '+naziv)
    if(naziv == 'Pročitaj'){
      //console.log('Uslo u uslov')
      this.procitajFajl()
    }else if(naziv == 'Izmjeni'){
      this.izmjeniFajl()
    }else if(naziv == "Preuzmi"){
      this.servisPodaci.getFajlText(this.idFajla, this.token).subscribe((result: any)=>{
        const data = result;
        const blob = new Blob([data], { type: 'application/octet-stream' });
        var url = window.URL.createObjectURL(blob);
        saveAs(blob,this.izabraniFajl.naziv+".txt");
      })
    }else if(naziv == 'Obriši'){
      this.brisanjeFajla();
    }
  }

  premjesti(dir: Direktorijum){
    var f = this.izabraniFajl;
    var lok;
    if(dir.lokacija.endsWith('\\')){
      lok=dir.lokacija+dir.naziv;
    }
    else{
      lok=dir.lokacija+'\\'+dir.naziv;
    }
    f.lokacija = dir.lokacija+'/'+dir.naziv;
    this.servisPodaci.moveFajl(this.idFajla, f,this.token).subscribe((result:any)=>{
      var l = new Logovi();
                  l.akcija = 'premjesten';
                  l.korisnik = this.korisnik;
                  l.objekat = f.naziv;
                  l.pregledan = 'false';
                  this.servisPodaci.logAktivnost(l, this.token).subscribe((result: any)=>{
                    //console.log(result);
                  });
      
      window.location.reload();
    })
  }

  brisanjeFajla(){
    this.servisPodaci.deleteFajl(this.idFajla, this.token).subscribe((result : any)=>{
      var l = new Logovi();
                  l.akcija = 'obrisan';
                  l.korisnik = this.korisnik;
                  l.objekat = this.izabraniFajl.naziv;
                  l.pregledan = 'false';
                  this.servisPodaci.logAktivnost(l, this.token).subscribe((result: any)=>{
                    //console.log(result);
                  });
      //console.log(result);
      window.location.reload();
    })
  }

  dodajFajl(){
    this.cuvanjeService.setLokacijaDir(this.trenutniDir.lokacija, this.trenutniDir.naziv)
    this.cuvanjeService.setdirektorijumIdAddFile(this.trenutniDir.id);
    this.cuvanjeService.setDaLiJeNoviDir(false);
    this.router.navigateByUrl('add');
  }

  brisanjeDir(dir : Direktorijum){
    this.servisPodaci.deleteDir(dir.id, this.token).subscribe((result : any)=>{
      var l = new Logovi();
                  l.akcija = 'obrisan';
                  l.korisnik = this.korisnik;
                  l.objekat = dir.naziv;
                  l.pregledan = 'false';
                  this.servisPodaci.logAktivnost(l, this.token).subscribe((result: any)=>{
                    //console.log(result);
                  });
      //console.log(result);
      window.location.reload();
    })
  }

  dodajDir(){
    this.cuvanjeService.setLokacijaDir(this.trenutniDir.lokacija, this.trenutniDir.naziv)
    this.cuvanjeService.setDaLiJeNoviDir(true);
    this.router.navigateByUrl("add")

  }

  izmjeniFajl(){
    this.servisPodaci.getFajlText(this.idFajla, this.token).subscribe((result: any)=>{
      //console.log('Uslo u subscribe')
      //console.log(result)
      this.cuvanjeService.setText(result);
      this.cuvanjeService.setIzbor(2);
      this.router.navigateByUrl('fajl')
    })
  }

  procitajFajl(){
    this.servisPodaci.getFajlText(this.idFajla, this.token).subscribe((result: any)=>{
      //console.log('Uslo u subscribe')
      //console.log(result)
      this.cuvanjeService.setText(result);
      this.cuvanjeService.setIzbor(1);
      this.router.navigateByUrl('fajl')
    })
  }

  odloguj(){
    if(this.korisnik.role.toString() == 'ADMINS'){
      var createGuest = require('cross-domain-storage/guest');
      var bazStorage = createGuest('https://localhost:4402');
      console.log('uslo')
      bazStorage.set('token', '', (error:any, data:any)=>{ 
        console.log('data: '+data)
        bazStorage.set('kod', '', (error:any, data:any)=>{ 

        
        console.log('data: '+data)
        bazStorage.set('kor', '', (error:any, data:any)=>{
          console.log('data: '+data)
        });
        });       
      });
      
      //bazStorage.close();
    }
    this.cuvanjeService.setKorisnik(new Korisnik());
    this.cuvanjeService.setToken('')
    this.router.navigateByUrl('')
  }


  
}


