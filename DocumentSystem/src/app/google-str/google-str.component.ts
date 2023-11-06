import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { Prijava } from '../model/prijava';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';

@Component({
  selector: 'app-google-str',
  templateUrl: './google-str.component.html',
  styleUrls: ['./google-str.component.css']
})
export class GoogleStrComponent implements OnInit {

  id : String='';

  constructor(private router: Router, private routerActive: ActivatedRoute, private cuvanjePod : CuvanjeServiceService,private podaciService : PodaciServiceService) { 
    
  }

  ngOnInit(): void {
    this.routerActive.queryParams
      .subscribe(params => {
        console.log(params); 
        this.id = params['id'];
        console.log(this.id); 
        if(this.id != null){
          this.podaciService.googlePrijava(this.id).subscribe((result : any) => {
            console.log(result)
            if(result != null){
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
              this.cuvanjePod.setToken(result.token);
              this.cuvanjePod.setKorisnik(kor);
              this.router.navigateByUrl('main')
              console.log('uslo')
              console.log(result)
            }else{
              this.router.navigateByUrl('')
            }
          })          
        }else{
          this.router.navigateByUrl('')
        }
      }
    );
  }

}
