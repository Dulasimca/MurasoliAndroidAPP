import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  content: any = [];

  constructor() {}
  


  ngOnInit(): void {
    this.loadAbout();
  }


  loadAbout() {
    this.content.push(
      ) ;
  }


 
}
