import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlavnaComponent } from './glavna/glavna.component';
import { KreiranjeAdminDComponent } from './kreiranje-admin-d/kreiranje-admin-d.component';
import { KreiranjeKlijentaComponent } from './kreiranje-klijenta/kreiranje-klijenta.component';
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
    path:'main',
    component:GlavnaComponent
  },
  {
    path:'workUser',
    component: KreiranjeKlijentaComponent
  },
  {
    path:'workAdmin',
    component: KreiranjeAdminDComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
