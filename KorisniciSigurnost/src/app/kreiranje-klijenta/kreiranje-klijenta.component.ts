import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Direktorijum } from '../model/direktorijum';
import { Korisnik, Role } from '../model/korisnik';
import { ReqKorisnik } from '../model/reqKorisnik';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';


@Component({
  selector: 'app-kreiranje-klijenta',
  templateUrl: './kreiranje-klijenta.component.html',
  styleUrls: ['./kreiranje-klijenta.component.css']
})
export class KreiranjeKlijentaComponent implements OnInit {

  direktorijumi : Direktorijum[]=[]
  isActive:Boolean=true;
  unosKlijent= new FormGroup({
    kIme: new FormControl(''),
    ime: new FormControl(''),
    prezime : new FormControl(''),
    email: new FormControl(''),
    mobilni : new FormControl(''),
    dir : new FormControl(''),
    lozinka: new FormControl(''),
    domen : new FormControl(''),
    ipAdresa : new FormControl(''),
    create : new FormControl(Boolean(true)),
    update : new FormControl(Boolean(true)),
    delete : new FormControl(Boolean(true)),
    read : new FormControl(Boolean(true)),
  });
  korisnik : Korisnik = new Korisnik();
  token : string = '';
  dirs : Direktorijum[] =[]
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
      console.log('izmjena vrijednost u sacuvaj: ' +this.izmjena)
      if(this.izmjena != 0){
        this.servisPodaci.getOne(this.izmjena, this.token).subscribe((result : any)=>{
          console.log(result)
          this.unosKlijent.controls['kIme'].setValue(result.korisnickoIme)
          this.unosKlijent.controls['ime'].setValue(result.ime)
          this.unosKlijent.controls['prezime'].setValue(result.prezime)
          this.unosKlijent.controls['email'].setValue(result.mail)
          this.unosKlijent.controls['mobilni'].setValue(result.mobilni)
          this.unosKlijent.controls['dir'].setValue(result.direktorijum.naziv)
          this.unosKlijent.controls['domen'].setValue(result.domen);
          this.unosKlijent.controls['ipAdresa'].setValue(result.ipAdresa);
          this.unosKlijent.controls['create'].setValue(result.create);
          this.unosKlijent.controls['update'].setValue(result.update);
          this.unosKlijent.controls['delete'].setValue(result.delete);
          this.unosKlijent.controls['read'].setValue(result.read);
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
          newKor.role=Role.KLIJENT;
          newKor.ime = this.unosKlijent.value.ime;
          newKor.prezime = this.unosKlijent.value.prezime;
          newKor.korisnickoIme = this.unosKlijent.value.kIme;
          newKor.mail = this.unosKlijent.value.email;
          newKor.mobilni = this.unosKlijent.value.mobilni;
          newKor.create = this.unosKlijent.value.create;
          newKor.delete = this.unosKlijent.value.delete;
          newKor.read = this.unosKlijent.value.read;
          newKor.update = this.unosKlijent.value.update;
          newKor.domen= this.unosKlijent.value.domen;
          newKor.ipAdresa= this.unosKlijent.value.ipAdresa;
          for(var r in this.direktorijumi){
            if(this.direktorijumi[r].naziv == this.unosKlijent.value.dir)
            {
              newKor.direktorijum = this.direktorijumi[r]
            }
          }  
          console.log('izmjena vrijednost u sacuvaj: ' +this.izmjena)
          if(this.izmjena != 0){
            newKor.id=this.izmjena;
            this.servisPodaci.updateUser(newKor, this.token).subscribe((result : any)=>{
              
              console.log(result)
              this.cuvanjeService.setIzmjenaKorisnik(0);
            })
          }else {

          this.servisPodaci.addUser(newKor, this.token).subscribe((result : any)=>{
            //console.log(result);
          })

        }
      
    }
  }

}
