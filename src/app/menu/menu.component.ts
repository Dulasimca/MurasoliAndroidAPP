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
          { label: 'சென்னை', routerLink: '/homeeditionchennai'},
          { label: 'கோயம்புத்தூர்', routerLink: '/homeeditioncoimbatore' },
          { label: 'மதுரை', routerLink: '/homeeditionmadurai' },
        ]
      },
      {
        label: 'செய்திகள்', icon: 'pi pi-fw pi-globe', 
        items: [
          { label: 'மாநில செய்திகள்', routerLink: '/state-news'},
          { label: 'தேசிய செய்திகள்', routerLink: '/news' },
          { label: 'மாவட்ட செய்திகள்', routerLink: '/district-news' },
        ]
      },
      // {
      //   // label: 'தலையங்கம்', icon: 'pi pi-fw pi-pencil'
      // },
      {
        label: 'முரசொலி பற்றி', icon: 'pi pi-fw pi-exclamation-circle', routerLink: '/about'
      },
      {
        label: 'தொடர்பு கொள்க', icon: 'pi pi-fw pi-phone', routerLink: '/contact-us'
      },
      // {
      //   label: 'இ – பேப்பர்', icon: 'pi pi-fw pi-paperclip', routerLink: '/e-paper'
      // }
    ];
  }
}
