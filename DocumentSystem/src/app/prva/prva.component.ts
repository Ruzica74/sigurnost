import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleServiceService } from '../service/google-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import {Prijava} from '../model/prijava'
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-prva',
  templateUrl: './prva.component.html',
  styleUrls: ['./prva.component.css']
})
export class PrvaComponent implements OnInit {

  loginPodaci: Prijava = new Prijava()
  isActive:Boolean=true;
  loginForma= new FormGroup({
    kIme: new FormControl(''),
    lozinka: new FormControl('')
  });
  bazStorage:any

  constructor(private router: Router, 
    private servisPrijava : PodaciServiceService, private cuvanjeService : CuvanjeServiceService) { 
      var createGuest = require('cross-domain-storage/guest');
      this.bazStorage = createGuest('https://localhost:4402');
      this.bazStorage.get('token', (error: any, data: any) => {
        console.log('iz skladista: ', { error, data });
        if(data != null && data!=''){
          this.bazStorage.get('kor', (error: any, kor: any) => {
            var korisnik=kor!=null ? JSON.parse(kor) : null;
            console.log(korisnik)
            this.cuvanjeService.setKorisnik(korisnik);
          });
          this.cuvanjeService.setToken(data);
          this.router.navigateByUrl('main');
        }       
      });
      //this.bazStorage.close();
  }

  ngOnInit(): void {
    
  }


  dalje(){
    this.loginPodaci.korisnickoIme=this.loginForma.value.kIme;
    this.loginPodaci.lozinka=this.loginForma.value.lozinka;
    this.servisPrijava.prijava(this.loginPodaci).subscribe((result : any)=>{
      //console.log(result)
      if(result!=null)
      {
        var kor = new Korisnik();
        kor.id = result.id;
        kor.ime = result.ime;
        kor.korisnickoIme = result.korisnickoIme;
        kor.prezime = result.prezime;
        kor.role = result.role;
        kor.read = result.read;
        kor.create = result.create;
        kor.delete = result.delete;
        kor.update = result.update;
        kor.direktorijum = result.direktorijum;
        this.cuvanjeService.setToken(result.token);
        this.cuvanjeService.setKorisnik(kor);
        //this.router.navigateByUrl('main');
        /*if(kor.role.toString() == 'ADMINS'){
          console.log(result.token)
          this.bazStorage.set('kod', 'jedan', (error:any, data:any)=>{ 
            console.log('data: '+data)
            this.bazStorage.set('token', result.token, (error:any, data:any)=>{ 

            
            console.log('data: '+data)
            this.bazStorage.set('kor', JSON.stringify(kor), (error:any, data:any)=>{
              console.log('data: '+result.token)
            });
            });       
          });
          
          //this.bazStorage.close();
        }*/
        this.router.navigateByUrl('login');
        
      }
      else{
        (<HTMLInputElement>document.getElementById("popuni")).style.display="none";
        (<HTMLInputElement>document.getElementById("greska")).style.display="block";
      }
    })
  }

}
