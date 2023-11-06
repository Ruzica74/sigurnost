import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fajl } from '../model/fajl';
import { Korisnik } from '../model/korisnik';
import { Logovi } from '../model/logovi';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';

@Component({
  selector: 'app-fajl',
  templateUrl: './fajl.component.html',
  styleUrls: ['./fajl.component.css']
})
export class FajlComponent implements OnInit {
  isActive:Boolean=true;
  text: string = '';
  fajl: Fajl = new Fajl();
  korisnik : Korisnik = new Korisnik();
  token : string = '';
  izbor :number = 0;

  constructor(private router: Router, 
    private servisPodaci : PodaciServiceService, private cuvanjeService : CuvanjeServiceService) {
      this.text = this.cuvanjeService.getText();
      this.izbor = this.cuvanjeService.getIzbor();
      this.fajl = this.cuvanjeService.getOtvoreniFajl();
      this.korisnik = this.cuvanjeService.getKorisnik();
      this.token = this.cuvanjeService.getToken();
     }

  ngOnInit(): void {
    if(this.token == ''){
      this.router.navigateByUrl("");
    }
  }

  nazad(){
    this.router.navigateByUrl('main');
  }

  upload(){
    //console.log("novi text: "+this.text)
    this.servisPodaci.updateFajl(this.fajl.id, this.text, this.token).subscribe((result: any)=>{
      var l = new Logovi();
                  l.akcija = 'izmjenjen sadrzaj';
                  l.korisnik = this.korisnik;
                  l.objekat = this.fajl.naziv;
                  l.pregledan = 'false';
                  this.servisPodaci.logAktivnost(l, this.token).subscribe((result: any)=>{
                    //console.log(result);
                  });
      //console.log(result)
    })
  }

}
