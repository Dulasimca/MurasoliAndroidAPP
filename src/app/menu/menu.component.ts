import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'முகப்பு', icon: 'pi pi-fw pi-home', routerLink: '/home'
      },
      // routerLink: '/homeedition',
      {
        label: 'பதிப்பு', icon: 'pi pi-fw pi-print', 
        items: [
          { label: 'சென்னை', routerLink: '/chennaiedition'},
          { label: 'கோயம்புத்தூர்', routerLink: '/coimbatoreedition' },
          { label: 'மதுரை', routerLink: '/maduraiedition' },
          { label: 'திருச்சி', routerLink: '/trichyedition' }
        ]
      },
      {
        label: 'செய்திகள்', icon: 'pi pi-fw pi-globe', 
        items: [
          { label: 'உலக செய்திகள்', routerLink: '/world-news' },
          { label: 'தேசிய செய்திகள்', routerLink: '/news' },
          { label: 'மாநில செய்திகள்', routerLink: '/state-news'},
          { label: 'மாவட்ட செய்திகள்', routerLink: '/district-news' },
          
        ]
      },
      {
        label: 'தலையங்கம்', icon: 'pi pi-fw pi-pencil', routerLink: '/editorial'
      },
      {
        label: 'முரசொலி பற்றி', icon: 'pi pi-fw pi-exclamation-circle', routerLink: '/about'
      },
      {
        label: 'தொடர்பு கொள்க', icon: 'pi pi-fw pi-phone', routerLink: '/contact-us'
        
      },
      {
        label: 'இ – பேப்பர்', icon: 'pi pi-fw pi-paperclip', routerLink:  '/e-paper'
      }
    ];
    document.body.scrollTop =0;
    this.checkPosition();
    if(document.body.scrollWidth > 300){
        // this.gotoTop();
         this.isShow = true;
       }else{
       this.isShow= false;
       }
    }
    isShow= true;
    topPosToStartShowing = 100;
  
    // TODO: Cross browsing
    gotoTop($element: any) :void{
      //document.body.scrollTop = 0;
      //$element.gotoTopview
      $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  
    checkPosition(){
      if(document.body.scrollWidth > 300){
       // this.gotoTop();
        this.isShow = true;
      }else{
      this.isShow= false;
      }
  }
  
}
