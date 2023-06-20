import { Component,HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MurasoliNews';
  hide: boolean = false;
  message: any;
  constructor(private _router: Router) {
    this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        console.log('succ')
        if(event.url === '/inauguration-page' || event.url == '/'){
          this.hide = true;
        }else{
          console.log('fail')
          this.hide = false;
        }
      }
    })

}
}


