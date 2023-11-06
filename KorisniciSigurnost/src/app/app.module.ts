import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrvaComponent } from './prva/prva.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TokenComponent } from './token/token.component';
import { GlavnaComponent } from './glavna/glavna.component';
import {MatTableModule} from '@angular/material/table';
import { KreiranjeKlijentaComponent } from './kreiranje-klijenta/kreiranje-klijenta.component';
import { KreiranjeAdminDComponent } from './kreiranje-admin-d/kreiranje-admin-d.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    PrvaComponent,
    TokenComponent,
    GlavnaComponent,
    KreiranjeKlijentaComponent,
    KreiranjeAdminDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
