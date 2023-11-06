import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  baseApiUrl = "https://file.io"

  constructor(private http:HttpClient) { }

  upload(file:any, idFajla:number, token: string):Observable<Object> {
  
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        Authorization: 'Bearer '+token,
      })
    };
    // Create form data
    const formData = new FormData(); 
    
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post("https://localhost:8433/fajl/dodajText/"+idFajla, formData, httpOptions1)
  }



}
