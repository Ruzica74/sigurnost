import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jedan',
  templateUrl: './jedan.component.html',
  styleUrls: ['./jedan.component.css']
})
export class JedanComponent implements OnInit {
  storageHost :any

  constructor() { 
    /*localStorage.setItem('kod', '');
    localStorage.setItem('kor', '');
    localStorage.setItem('token', '');*/
    var createHost = require('cross-domain-storage/host');
    this.storageHost = createHost([
      {
          origin: 'https://localhost:4200',
          allowedMethods: ['get', 'set', 'remove']
      },
      {
          origin: 'https://localhost:4401',
          allowedMethods: ['get', 'set', 'remove']
      },
      {
          origin: 'http://localhost:4402',
          allowedMethods: ['get', 'set', 'remove']
      }
    ]);
  }

  ngOnInit(): void {
  }

  closeHost(){
    this.storageHost.close();
  }

}
