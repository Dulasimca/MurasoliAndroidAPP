import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { Converter } from '../helper/converter';
import { DataSharingService } from './data-sharing.service';
import { RestapiService } from './restapi.service';

@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    news: any[] = [];
    data!: Observable<any>;
    district?: any = [];
    list: any = [];
    globalsearch:number=1;
    constructor(private _restApiService: RestapiService, private _datepipe: DatePipe,
      private _converter: Converter, private _dataSharing: DataSharingService) { }

    getDistrict(): any {
        this.district = [];
        this._restApiService.get('DistrictMaster/GetDistrictMaster').subscribe(res => {
            this.district = res;
        })
        return this.district;
    }

    setNewsData(data: any) {
        this.news = data;
        // localStorage.setItem('NEWS', JSON.stringify(data));
    }

    // getSessionNews() {
    //   return JSON.parse(localStorage.getItem('NEWS') as any);
    // }

    getNewsData() {
        return this.news;
    }

    setGlobalPagNum(pageno: number) {
      this.globalsearch = (pageno !== undefined && pageno !== null) ? pageno : 1;
    }


    createObject(data: any): any {    
      this.list= [];    
      data.forEach((x: any) => {
        var date = this._datepipe.transform(x.g_incidentdate, 'MMM dd,yyyy h:mm a');
        const incidentDate = this._converter.convertMonth(2, date?.toString());
        x.storyId = x.g_slno;
        x.incidentDate = incidentDate;
        x.img = x.g_image;
        x.imgURL = this._dataSharing.smallImgURL + x.g_image;
        x.imgDocURL = this._dataSharing.imgURL + x.g_image;
        x.hasImg = (x.g_image && x.g_image !== '') ? true : false;
        x.headLine = x.g_newstitletamil;
        x.newsShort = x.g_newsshorttamil;
        x.newsDetail = x.g_newsdetailstamil;
        this.list.push(x);
      })
      return this.list;
    }
  }