import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthService: AuthConfig ={
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '679804426531-muitsje0djffqvrjq6fat8l0qku55bon.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleServiceService {

  constructor(public readonly oAuthService : OAuthService ) { 
    oAuthService.configure(oAuthService)
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if(!oAuthService.hasValidAccessToken()){
          oAuthService.initLoginFlow()
        }else {
          oAuthService.loadUserProfile().then( (userProfile) => {
            console.log(JSON.stringify(userProfile))
          })
        }
      })
    
    }) 
  }

  }

  



