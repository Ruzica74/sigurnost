import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodavanjeComponent } from './dodavanje/dodavanje.component';
import { FajlComponent } from './fajl/fajl.component';
import { GlavnaComponent } from './glavna/glavna.component';
import { GoogleStrComponent } from './google-str/google-str.component';
import { PrikazAktivnostiComponent } from './prikaz-aktivnosti/prikaz-aktivnosti.component';
import { PrvaComponent } from './prva/prva.component';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  {
    path:'',
    component:PrvaComponent
  },
  {
    path:'login',
    component:TokenComponent
  },
  {
    path:'log',
    component:GoogleStrComponent
  },
  {
    path:'main',
    component:GlavnaComponent
  },
  {
    path:'fajl',
    component:FajlComponent
  },
  {
    path:'add',
    component:DodavanjeComponent
  },
  {
    path:'activity',
    component:PrikazAktivnostiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
