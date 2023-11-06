import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Direktorijum } from '../model/direktorijum';
import { Fajl } from '../model/fajl';
import { Korisnik } from '../model/korisnik';
import { Logovi } from '../model/logovi';
import { CuvanjeServiceService } from '../service/cuvanje-service.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';
import { PodaciServiceService } from '../service/podaci-service.service';

@Component({
  selector: 'app-dodavanje',
  templateUrl: './dodavanje.component.html',
  styleUrls: ['./dodavanje.component.css']
})
export class DodavanjeComponent implements OnInit {
  korisnik: Korisnik = new Korisnik();
  token : string = '';
  file :File | undefined ;
  texttt :string = '';
  daLiJeDir : boolean = false;
  imeDir : string = '';

  constructor(private fileUploadService: FileUploadServiceService, private router: Router, private cuvanjeService : CuvanjeServiceService,
    private servisPodaci : PodaciServiceService ) { 
    this.korisnik = cuvanjeService.getKorisnik();
    this.token = cuvanjeService.getToken();
    this.daLiJeDir = cuvanjeService.getDaLiJeNoviDir();
  }

  ngOnInit(): void {
    if(this.token == ''){
      this.router.navigateByUrl("");
    }
  }

  noviDir(){
    var d = new Direktorijum();
    d.naziv = this.imeDir;
    d.lokacija = this.cuvanjeService.getLokacijaDir();
    this.servisPodaci.addDir(d, this.token).subscribe((result: any)=>{
      if(result != null){
        var l = new Logovi();
                  l.akcija = 'dodat';
                  l.korisnik = this.korisnik;
                  l.objekat = d.naziv;
                  l.pregledan = 'false';
                  this.servisPodaci.logAktivnost(l, this.token).subscribe((result: any)=>{
                    //console.log(result);
                  });
        (<HTMLInputElement>document.getElementById("obavjestenjeDobar1")).style.display="flex";
      }else{
        (<HTMLInputElement>document.getElementById("obavjestenjeLos1")).style.display="flex";
      }
    })
  }

  onUpload() {
    //console.log(this.file);
    var f = new Fajl();
    if(this.file != null){
      f.naziv = this.file?.name.replace('.txt', '');
      f.lokacija = this.cuvanjeService.getLokacijaDir();
      //f.direktorijum = this.cuvanjeService.getdirektorijumIdAddFile()
      

      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        //console.log('result: '+fileReader.result);
        var x = fileReader.result;
        if(typeof(x) == 'string'){
          this.cuvanjeService.setText(x);
        }
      }
      if(this.file != null){
        //console.log('read: '+fileReader.readAsText(this.file));
      }
      
      

      this.servisPodaci.addFajl(f, this.token).subscribe((result:any)=>{
        if(result != null){   
          //console.log('rezultat: '+result);
          this.servisPodaci.addFajlContent(result, this.cuvanjeService.getText(), this.token).subscribe(
            (result: any) => {
              //console.log(result)
                if (result != null) {
                  var l = new Logovi();
                  l.akcija = 'dodat';
                  l.korisnik = this.korisnik;
                  l.objekat = f.naziv;
                  l.pregledan = 'false';
                  this.servisPodaci.logAktivnost(l, this.token).subscribe((result: any)=>{
                    //console.log(result);
                  });

                    // Short link via api response
                    (<HTMLInputElement>document.getElementById("obavjestenjeDobar")).style.display="flex";
                }else{
                  (<HTMLInputElement>document.getElementById("obavjestenjeLos")).style.display="flex";
                }
            }
          );
        }
      })
  
  }
  }

  onChange(event:any) {
    this.file = event.target.files[0];
    /*let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log('result: '+fileReader.result);
        var x=fileReader.result!=null ? fileReader.result : '';
        this.cuvanjeService.setText(x.toString());
      }
      if(this.file != null){
        fileReader.readAsText(this.file);
      }*/
    (<HTMLInputElement>document.getElementById("obavjestenjeDobar")).style.display="none";
    (<HTMLInputElement>document.getElementById("obavjestenjeLos")).style.display="none";
  }
}
