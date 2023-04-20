import { Component, OnInit } from '@angular/core';
import { Converter } from '../helper/converter';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  day: any;
  dateToday: Date = new Date();
  href: string = '';
  headLine: string = '';


  constructor(private _converter: Converter, private _dataSharing: DataSharingService) { }

  ngOnInit(): void {
    this.day = new Date().toLocaleString('en-us', {weekday:'long'});
    const dayStr: string = this.day.toString().split(',');
    var convertedDay = this._converter.convert(dayStr[0].toString().toUpperCase());
    this.day = this.day.toString().replace(dayStr[0], convertedDay);
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
