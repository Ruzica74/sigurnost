import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  isActive:Boolean=true;
  unos= new FormGroup({
    kod: new FormControl('')
  });
  korisnik : Korisnik = new Korisnik();
  token : string = '';
  praviKod : string = 'kod';
  uneseno : string = '';

  constructor(private router: Router, private servicePodaci : PodaciServiceService, private cuvanjeService: CuvanjeServiceService) { 
    this.korisnik = this.cuvanjeService.getKorisnik();
    this.token = this.cuvanjeService.getToken();
    this.servicePodaci.sendSms(this.korisnik.id, this.token).subscribe((result : any)=>{
      if(result != null){
        this.praviKod = result;
      }
    })
  }

  ngOnInit(): void {
    if(this.token == ''){
      this.router.navigateByUrl("");
    }
  }

  prijava(){
    this.uneseno = this.unos.value.kod;
    //console.log("pokupljeni kod: "+this.uneseno+ " pravi kod: "+this.praviKod)
    if(this.praviKod == this.uneseno){
      if(this.korisnik.role.toString() == 'ADMINS'){
      var createGuest = require('cross-domain-storage/guest');
      var bazStorage = createGuest('https://localhost:4402');
      bazStorage.set('kod', 'jedan', (error:any, data:any)=>{ 
        console.log('data: '+data)
        bazStorage.set('token', this.token, (error:any, data:any)=>{ 

        
        console.log('data: '+data)
        bazStorage.set('kor', JSON.stringify(this.korisnik), (error:any, data:any)=>{
          console.log('data: '+data)
        });
        });       
      });
      }
      //bazStorage.close();
      this.router.navigateByUrl('main');
    }else{
      this.router.navigateByUrl('');
    }
  }

}
