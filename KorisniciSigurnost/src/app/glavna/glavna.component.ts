import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';

@Component({
  selector: 'app-glavna',
  templateUrl: './glavna.component.html',
  styleUrls: ['./glavna.component.css']
})
export class GlavnaComponent implements OnInit {
  displayedColumns: string[] = ['Ime', 'Prezime', 'kIme', 'Rola', 'Izmjeni', 'Obrisi'];
  podaci : Korisnik[]=[];
  public  dataSource= new MatTableDataSource(this.podaci); 
  korisnik : Korisnik = new Korisnik();
  token : string = ''


  constructor(private router: Router, 
    private servisPodaci : PodaciServiceService, private cuvanjeService : CuvanjeServiceService) {
      this.korisnik = this.cuvanjeService.getKorisnik()
      this.token = this.cuvanjeService.getToken()
      this.servisPodaci.getAllUsers(this.token).subscribe((result:any)=>{
        this.podaci = result;
        this.dataSource=new MatTableDataSource(this.podaci);
      })
      
     }

  ngOnInit(): void {
    if(this.token == ''){
      this.router.navigateByUrl("");
    }
  }

  kreirajKlijenta(){
    this.cuvanjeService.setIzmjenaKorisnik(0);
    this.router.navigateByUrl('workUser');
  }

  kreirajAdminD(){
    this.cuvanjeService.setIzmjenaKorisnik(0);
    this.router.navigateByUrl('workAdmin');
  }

  izmjeni(k :Korisnik){
    this.cuvanjeService.setIzmjenaKorisnik(k.id);
    if(k.role.toString() == 'KLIJENT'){
      this.router.navigateByUrl('workUser')
    }else{
      this.router.navigateByUrl('workAdmin')
    }

  }

  obrisi(k : Korisnik){
    this.servisPodaci.deleteKorisnik(k.id, this.token).subscribe((result : any)=>{
      console.log(result);
      window.location.reload();
    })
    
  }

  odloguj(){
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
    this.cuvanjeService.setKorisnik(new Korisnik());
    this.cuvanjeService.setToken('')
    this.router.navigateByUrl('')
  }

}
