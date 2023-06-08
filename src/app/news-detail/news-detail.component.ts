import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Converter } from '../helper/converter';
import { DataSharingService } from '../services/data-sharing.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  headLine: string = '';
  incidentDate: any;
  newsDetail: string = '';
  imgSrc: any;
  hasImg: boolean = false;
  paperTitle: string = '';
  navUrl: string = '';
  href: string = '';
  storyId: any;
  size = 18;
  constructor(private _dataSharing: DataSharingService, private _datepipe: DatePipe,
    private _restApiService: RestapiService, private _converter: Converter,
    private _snapshot: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('new')
    this._snapshot.queryParams.subscribe(value => {
      this.storyId = value['storyid'];
    })
    const params = new HttpParams().append('_storyId', this.storyId);
    this.paperTitle = this._dataSharing.paperName;
    this._restApiService.getByParameters('MainNewsEntry/GetMainNewsEntryById', params).subscribe(res => {
      if (res) {
        var data = res.Table[0];
        var fullDate = this._datepipe.transform(data.g_incidentdate, 'MMM dd,yyyy h:mm a');
        const incidentDate = this._converter.convertMonth(2, fullDate?.toString());
        this.headLine = data.g_newstitletamil;
        this.incidentDate = incidentDate;
        this.newsDetail = data.g_newsdetailstamil;
        this.hasImg = (data.g_image && data.g_image !== '') ? true : false;
        this.imgSrc = this._dataSharing.imgURL + data.g_image;
      }
    });
  }

  share(type: string) {
    const shareUrl = window.location.href;
    let returnValue = null;
    if (type === '_MA') {
      this.href = 'mailto:?subject=' + this.headLine + '&body=Check out this ' + shareUrl;
      returnValue = null;
    } else {
      returnValue = this._dataSharing.shareNews(type, shareUrl);
    }
    return returnValue;
  }
}
