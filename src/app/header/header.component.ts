import { Component, OnInit } from '@angular/core';
import { Converter } from '../helper/converter';
import { DataSharingService } from '../services/data-sharing.service';
import { Router } from '@angular/router';

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

  searchText: string='';
  blockSpace: RegExp = /[^\s]/;

  constructor(private _converter: Converter, private _router: Router, private _dataSharing: DataSharingService) { }

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
      this.href = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=username@gmail.com' + '?subject=files' + '&body=Hi,Check out this -' + 'www.murasoli.in';
      returnValue = null;
    } else {
      returnValue = this._dataSharing.shareNews(type, shareUrl);
    }
    return returnValue;
  }

  onClick(event: any) {
    // this.searchText;
    if (this.searchText !== undefined && this.searchText !== "")
    {
      this._router.navigate(['/search'],{queryParams:{search:this.searchText}});
    }
  }
}
