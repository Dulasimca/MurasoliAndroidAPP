import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as confetti from 'canvas-confetti';
import { RestapiService } from '../services/restapi.service';


@Component({
  selector: 'app-inauguration-page',
  templateUrl: './inauguration-page.component.html',
  styleUrls: ['./inauguration-page.component.scss']
})
export class InaugurationPageComponent implements OnInit {
  targetDate: any;
  date: any;
  now: any;
  difference: number = 0;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  // @ViewChild('days', { static: true }) days!: ElementRef;
  // @ViewChild('hours', { static: true }) hours!: ElementRef;
  fixTargetDate: any;
  imageOne: string = '';
  imageTwo: string = '';
  imageThree: string = '';
  imageFour: string = '';
  dmkIcon: string = '';
  murasoliLogo: string = '';
  loader: boolean = false;
  hideContent : boolean = true;
  constructor(private _router: Router, private restApiService: RestapiService) {
    this.restApiService.get('InaugurationTargetDate/GetTargetDate').subscribe(res => {
      this.fixTargetDate = res.Table[0].targetdate
      // console.log(fixTargetDate,'vp')
    })
  }

  ngOnInit(): void {
    this.loader = true;
    // this.imageOne = 'assets/gif/kalaignar.jpg';
    // this.imageTwo = 'assets/gif/Murasoli_Maran.jpeg';
    // this.imageThree = 'assets/gif/stalin.jpg';
    // this.imageFour = 'assets/gif/udstalin.jpg';
    // this.dmkIcon = 'assets/gif/dmkicon.jpg';
    // this.murasoliLogo = 'assets/gif/murasolilogo.png';
    var x = setInterval(() => {
      this.targetDate = new Date(this.fixTargetDate).getTime();
      this.now = new Date().getTime();
      this.difference = this.targetDate - this.now;
      if(this.difference > 0) {
        this.loader = false;
        this.hideContent = false;
      this.days = Math.floor(this.difference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.difference % (1000 * 60)) / 1000);
      }
      if (this.difference < 0) {
        clearInterval(x);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this._router.navigate(['/home']);
        this.showConfetti();
      }
    }, 1000);
  }

  showConfetti() {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    confetti.create(canvas, {
      resize: true,
      useWorker: true
    })({ particleCount: 3000, spread: 8000 });
  }
}
