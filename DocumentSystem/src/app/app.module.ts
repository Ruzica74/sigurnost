import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrvaComponent } from './prva/prva.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { TokenProvjeraComponent } from './token-provjera/token-provjera.component';
import { TokenComponent } from './token/token.component';
import { HttpClientModule } from '@angular/common/http';
//import { OAuthModule } from 'angular-oauth2-oidc';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { GoogleStrComponent } from './google-str/google-str.component';
import { GlavnaComponent } from './glavna/glavna.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { FajlComponent } from './fajl/fajl.component';
import { DodavanjeComponent } from './dodavanje/dodavanje.component';
import { PrikazAktivnostiComponent } from './prikaz-aktivnosti/prikaz-aktivnosti.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    PrvaComponent,
    TokenProvjeraComponent,
    TokenComponent,
    GoogleStrComponent,
    GlavnaComponent,
    FajlComponent,
    DodavanjeComponent,
    PrikazAktivnostiComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    //OAuthModule.forRoot()
    SocialLoginModule,
    MatToolbarModule,
    MatMenuModule, 
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '679804426531-muitsje0djffqvrjq6fat8l0qku55bon.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
