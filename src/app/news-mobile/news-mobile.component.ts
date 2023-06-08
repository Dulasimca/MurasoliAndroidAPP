import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../common-module/messages';

import { Converter } from '../helper/converter';
import { DataSharingService } from '../services/data-sharing.service';
import { NewsService } from '../services/news.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-news-mobile',
  templateUrl: './news-mobile.component.html',
  styleUrls: ['./news-mobile.component.scss']
})
export class NewsMobileComponent implements OnInit {
  newsDetails: any[] = [];
  newsAllData: any[] = [];
  title: string = 'மாநில செய்திகள்';
  districtOptions: SelectItem[] = [];
  district: any;
  districts?: any = [];
  totalRecords: number = 0;
  first: number = 1;
  data: any[] = [];
  pageNo: number = 1;
  showPaginator: boolean = false;
  loader: boolean = false;
  constructor(private _router: Router, private _restApiService: RestapiService,
    private _newsService: NewsService,private messageService: MessageService, private _dataSharing: DataSharingService) { }
  
    ngOnInit(): void {
      this.loadNews();
      //this._newsService.getDistrict();
    }

  //     const params = new HttpParams().append('slno','2');
  //     this._restApiService.getByParameters('MainNewsEntry/GetMainNewsEntrybystateId',params).subscribe(res => {
  //       if (res) {
  //         this.loader = false;
  //         // var centerColData: any[] = [];
  //         this._newsService.setNewsData(res.Table);
  //         var setLeftCount = 0, setSecondMainCount = 0, setCenterCount = 0, setRightCount = 0, setBottomCount = 0;
  //         res.Table.forEach((data: any) => {
  //           var date = this._datepipe.transform(data.g_incidentdate, 'MMM,dd h:mm a');
  //           var fullDate = this._datepipe.transform(data.g_incidentdate, 'MMM dd,yyyy h:mm a');
  //           const incidentShortDate = this._converter.convertMonth(1, date?.toString());
  //           const incidentDate = this._converter.convertMonth(2, fullDate?.toString());
  //           if (data.g_displayside === 0 && data.g_priority === 2) {
  //             if (setLeftCount < 5) {
  //               this.thridColData.push(
  //                 {
  //                   incidentShortDate: incidentShortDate,
  //                   incidentDate: incidentDate,
  //                   headLine: data.g_newstitletamil,
  //                   newsShort: (data.g_newsshorttamil.substring(0, 100)).concat('...'), newsDetail: data.g_newsdetailstamil,
  //                   img: data.g_image, imgURL: this._dataSharing.imgURL + data.g_image,
  //                   hasImg: (data.g_image && data.g_image !== '') ? true : false,
  //                   storyId: data.g_slno
  //                   // smallImgURL
  //                 }
  //               );
  //               setLeftCount++;
  //             }
           
  //       } else {
  //         console.log('error occurred');
  //       }
  //     }, (err: HttpErrorResponse) => {
  //       if (err.status === 0 || err.status === 400) { }
  //     });
  //   }
  // })
  //   }

  loadNews() {
    this.loader = true;
    const params = new HttpParams().append('slno','2');
    this._restApiService.getByParameters('MainNewsEntryState/GetMainNewsEntrybystateId',params).subscribe(res => {
      if (res !== null && res !== undefined) {
        this.loader = false;
        if(res.Table.length !== 0){
          this.loader = false;
        var response = this._newsService.createObject(res.Table);
        var response = res.Table;
        this.newsDetails = [];
        this.newsDetails = response.slice(0);
        this.newsAllData = this.newsDetails.slice(0);
        this.data = this.newsDetails.slice(0, 3);
         
      } else {
        this.loader = false;
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
      }else{
        this.loader = false;
        console.log('True')
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    });
  }
    onNavigate(data: any) {
      this._router.navigate(['/newscontent'], { queryParams: { storyid: data.storyId } });
    }

}
