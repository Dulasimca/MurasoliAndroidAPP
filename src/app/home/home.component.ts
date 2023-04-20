import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Converter } from '../helper/converter';
import { AuthService } from '../services/auth.service';
import { DataSharingService } from '../services/data-sharing.service';
import { NewsService } from '../services/news.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstColData: any = [];
  secondColData: any = [];
  thridColData: any = [];
  secondMainColData: any = [];
  bottomNewsData: any = [];
  breakingNews: string = '';

  constructor(private _router: Router, private _restApiService: RestapiService,
    private _dataSharing: DataSharingService, private _datepipe: DatePipe,
    private _converter: Converter, private _authService: AuthService, private _newsService: NewsService) { }

  ngOnInit(): void {
    this._authService.home();
    this.loadContent();
  }

  loadContent() {
    this._restApiService.get('FlashNewsEntry/GetFlashNewsEntry').subscribe(res => {
      res.Table.forEach((i: any) => {
        this.breakingNews += i.g_newsdetailstamil + ' ,';
      });
    });

    this._restApiService.get('MainNewsEntry/GetMainNewsEntry').subscribe(res => {
      if (res) {
        // var centerColData: any[] = [];
        this._newsService.setNewsData(res.Table);
        var setLeftCount = 0, setSecondMainCount = 0, setCenterCount = 0, setRightCount = 0, setBottomCount = 0;
        res.Table.forEach((data: any) => {
          var date = this._datepipe.transform(data.g_incidentdate, 'MMM,dd h:mm a');
          var fullDate = this._datepipe.transform(data.g_incidentdate, 'MMM dd,yyyy h:mm a');
          const incidentShortDate = this._converter.convertMonth(1, date?.toString());
          const incidentDate = this._converter.convertMonth(2, fullDate?.toString());
          if (data.g_displayside === 0 && data.g_priority === 2) {
            if (setLeftCount < 4) {
              this.firstColData.push(
                {
                  incidentShortDate: incidentShortDate, incidentDate: incidentDate, headLine: data.g_newstitletamil,
                  newsShort: data.g_newsshorttamil, newsDetail: data.g_newsdetailstamil,
                  img: data.g_image, imgURL: this._dataSharing.imgURL + data.g_image,
                  hasImg: (data.g_image && data.g_image !== '') ? true : false,
                  storyId: data.g_slno
                }
              );
              setLeftCount++;
            }
          } else if (data.g_displayside === 2 && data.g_priority === 2) {
            if (setCenterCount < 4 && setSecondMainCount > 0) {
              this.secondColData.push(
                {
                  incidentShortDate: incidentShortDate, incidentDate: incidentDate, headLine: data.g_newstitletamil,
                  newsShort: data.g_newsshorttamil, newsDetail: data.g_newsdetailstamil,
                  img: data.g_image, imgURL: this._dataSharing.imgURL + data.g_image,
                  hasImg: (data.g_image && data.g_image !== '') ? true : false,
                  storyId: data.g_slno
                }
              );
              setCenterCount++;
          }
            if (setSecondMainCount < 1) {
              this.secondMainColData.push(
                {
                  incidentShortDate: incidentShortDate, incidentDate: incidentDate, headLine: data.g_newstitletamil,
                  newsShort: data.g_newsshorttamil, newsDetail: data.g_newsdetailstamil,
                  img: data.g_image, imgURL: this._dataSharing.imgURL + data.g_image,
                  hasImg: (data.g_image && data.g_image !== '') ? true : false,
                  storyId: data.g_slno
                }
              );
              setSecondMainCount++;
            }
             
          } else if (data.g_displayside === 2 && data.g_priority === 2) {
            
          } else if (data.g_displayside === 1 && data.g_priority === 2) {
            if (setRightCount < 4) {
              this.thridColData.push(
                {
                  incidentShortDate: incidentShortDate, incidentDate: incidentDate, headLine: data.g_newstitletamil,
                  newsShort: data.g_newsshorttamil, newsDetail: data.g_newsdetailstamil,
                  img: data.g_image, imgURL: this._dataSharing.imgURL + data.g_image,
                  hasImg: (data.g_image && data.g_image !== '') ? true : false,
                  storyId: data.g_slno
                }
              );
              setRightCount++;
            }
          } else if (data.g_displayside === 3 && data.g_priority === 2) {
            if (setBottomCount < 8) {
              this.bottomNewsData.push(
                {
                  incidentShortDate: incidentShortDate, incidentDate: incidentDate, headLine: data.g_newstitletamil,
                  newsShort: data.g_newsshorttamil, newsDetail: data.g_newsdetailstamil,
                  img: data.g_image, imgURL: this._dataSharing.imgURL+ data.g_image,
                  hasImg: (data.g_image && data.g_image !== '') ? true : false,
                  storyId: data.g_slno
                  // smallImgURL 
                }
              );
              setBottomCount++;
            }
          }
        })
        // centerColData.forEach((item: any, index: number) => {
        //   item.imgURL = this._dataSharing.smallImgURL + item.img;
        //   if (index != 0) {
        //     this.secondColData.push(item);
        //   } else {
        //     this.secondMainColData.push(item);
        //   }
        // })
      } else {
        console.log('error occurred');
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) { }
    });
  }

  onNavigate(data: any) {
    this._router.navigate(['/newscontent'], {queryParams: { storyid: data.storyId }});
  }

}
