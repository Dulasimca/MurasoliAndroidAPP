import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  href: string = '';
  headLine: string = '';
  
  constructor(private _dataSharing: DataSharingService) { }

  ngOnInit(): void {
  }

  share(type: string) {
    const shareUrl = window.location.href;
    let returnValue = null;
    if (type === '_MA') {
      this.href = 'mailto:?subject=' + 'Murasoli' + '&body=Check out this -' + 'www.murasoli.in';
      returnValue = null;
    } else {
      returnValue = this._dataSharing.shareNews(type, shareUrl);
    }
    return returnValue;
  }

}
