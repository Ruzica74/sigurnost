import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { Logovi } from '../model/logovi';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-prikaz-aktivnosti',
  templateUrl: './prikaz-aktivnosti.component.html',
  styleUrls: ['./prikaz-aktivnosti.component.css']
})
export class PrikazAktivnostiComponent implements OnInit {
  korisnik : Korisnik = new Korisnik();
  token : string = '';
  podaci : Logovi[]=[];
  public  dataSource= new MatTableDataSource(this.podaci); 
  displayedColumns: string[] = ['Id', 'Korisnicko', 'Aktivnost', 'objekat'];
  notifikacije : Logovi[] = [];
  objekatNaziv: string = '';

  constructor(private router:Router, private servicePodaci : PodaciServiceService, public dialog: MatDialog,
    private cuvanjePodatakka : CuvanjeServiceService) {
    this.korisnik = this.cuvanjePodatakka.getKorisnik();
    this.token = this.cuvanjePodatakka.getToken();
    this.servicePodaci.getAllAktivnosti(this.token).subscribe((result : any)=>{
      this.podaci = result;
      this.dataSource=new MatTableDataSource(this.podaci);
    })

    this.servicePodaci.getNotifikacije(this.token).subscribe((result : any)=>{
      this.notifikacije = result;
    })
    
   }

  ngOnInit(): void {
    if(this.token == ''){
      this.router.navigateByUrl("");
    }
  }

  klik(log : Logovi){
    var i = this.notifikacije.indexOf(log);
    delete this.notifikacije[i];
    this.objekatNaziv = log.objekat;
    this.servicePodaci.setPregledano(log.id,log, this.token).subscribe((result: any)=>{
      //console.log(result);
    });

    (<HTMLInputElement>document.getElementById("obvj")).style.display="block";
    /*const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });*/

  }


}
