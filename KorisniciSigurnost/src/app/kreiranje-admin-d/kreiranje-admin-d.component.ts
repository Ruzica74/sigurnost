import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Direktorijum } from '../model/direktorijum';
import { Korisnik, Role } from '../model/korisnik';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';
import {ReqKorisnik} from '../model/reqKorisnik'

@Component({
  selector: 'app-kreiranje-admin-d',
  templateUrl: './kreiranje-admin-d.component.html',
  styleUrls: ['./kreiranje-admin-d.component.css']
})
export class KreiranjeAdminDComponent implements OnInit {


  direktorijumi : Direktorijum[]=[]
  isActive:Boolean=true;
  unosKlijent= new FormGroup({
    ime: new FormControl(''),
    prezime : new FormControl(''),
    email: new FormControl(''),
    mobilni : new FormControl(''),
    dir : new FormControl(''),
    kIme: new FormControl(''),
    lozinka: new FormControl(''),
  });

  korisnik : Korisnik = new Korisnik();
  token : string = '';
  izmjena : number = 0;



  constructor(private router: Router, 
    private servisPodaci : PodaciServiceService, private cuvanjeService : CuvanjeServiceService) {
      this.korisnik = cuvanjeService.getKorisnik();
      this.token = cuvanjeService.getToken();
      this.servisPodaci.getAllDirs(this.token).subscribe((result : any)=>{
        //console.log(result);
        if(result != null){
          this.direktorijumi = result;
        }
      })
      this.izmjena = this.cuvanjeService.getIzmjenaKorisnik();
      if(this.izmjena != 0){
        this.servisPodaci.getOne(this.izmjena, this.token).subscribe((result : any)=>{
          console.log(result)
          this.unosKlijent.controls['kIme'].setValue(result.korisnickoIme)
          this.unosKlijent.controls['ime'].setValue(result.ime)
          this.unosKlijent.controls['prezime'].setValue(result.prezime)
          this.unosKlijent.controls['email'].setValue(result.mail)
          this.unosKlijent.controls['mobilni'].setValue(result.mobilni)
          this.unosKlijent.controls['dir'].setValue(result.direktorijum.naziv)
          this.cuvanjeService.setIzmjenaKorisnik(0);
        })
        
      }
     }

  ngOnInit(): void {

    if(this.token == ''){
      this.router.navigateByUrl("");
    }
  }

  sacuvaj(){
    if(this.unosKlijent.value.ime!='' && this.unosKlijent.value.prezime!='' && this.unosKlijent.value.kIme!='' &&
    this.unosKlijent.value.email!='' && this.unosKlijent.value.mobilni!='' && this.unosKlijent.value.direktorijum!=''){
      var newKor = new ReqKorisnik();
        newKor.role=Role.ADMIND;
        newKor.ime = this.unosKlijent.value.ime;
        newKor.prezime = this.unosKlijent.value.prezime;
        newKor.korisnickoIme = this.unosKlijent.value.kIme;
        newKor.mail = this.unosKlijent.value.email;
        newKor.mobilni = this.unosKlijent.value.mobilni;
        newKor.direktorijum = this.unosKlijent.value.direktorijum;
        newKor.lozinka = this.unosKlijent.value.lozinka;
        for(var r in this.direktorijumi){
          if(this.direktorijumi[r].naziv == this.unosKlijent.value.dir)
          {
            newKor.direktorijum = this.direktorijumi[r]
          }
        }
      if(this.izmjena != 0){
        newKor.id=this.izmjena;
        this.servisPodaci.updateAdmin(newKor, this.token).subscribe((result : any)=>{
          
          console.log(result)
          this.cuvanjeService.setIzmjenaKorisnik(0);
        })
      }else {
        
        //console.log(newKor)  
            this.servisPodaci.addAdmin(newKor, this.token).subscribe((result : any)=>{
              //console.log(result);
            })
      }     

    }
  }

}
