import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { NewsService } from '../services/news.service';
import { Converter } from '../helper/converter';
import { DatePipe } from '@angular/common';
import { DataSharingService } from '../services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pathipu-mobile',
  templateUrl: './pathipu-mobile.component.html',
  styleUrls: ['./pathipu-mobile.component.scss']
})
export class PathipuMobileComponent implements OnInit {
  firstColData: any = [];
  loader: boolean = false;

  constructor(private _restApiService: RestapiService, private _newsService: NewsService, private _converter: Converter,
    private _datepipe: DatePipe, private _dataSharing: DataSharingService, private _router: Router) { }

  ngOnInit(): void {
    this.loader = true;
    this._restApiService.get('MainNewsEntry/GetMainNewsEntry').subscribe(res => {
      if (res) {
        this.loader = false;
        // var centerColData: any[] = [];
        this._newsService.setNewsData(res.Table);
        var setLeftCount = 0, setSecondMainCount = 0, setCenterCount = 0, setRightCount = 0, setBottomCount = 0;
        res.Table.forEach((data: any) => {
          var date = this._datepipe.transform(data.g_incidentdate, 'MMM,dd h:mm a');
          var fullDate = this._datepipe.transform(data.g_incidentdate, 'MMM dd,yyyy h:mm a');
          const incidentShortDate = this._converter.convertMonth(1, date?.toString());
          const incidentDate = this._converter.convertMonth(2, fullDate?.toString());
          if (data.g_displayside === 0 && data.g_priority === 2) {
            if (setLeftCount < 5) {
              this.firstColData.push(
                {
                  incidentShortDate: incidentShortDate,
                  incidentDate: incidentDate,
                  headLine: data.g_newstitletamil,
                  newsShort: (data.g_newsshorttamil.substring(0, 100)).concat('...'), newsDetail: data.g_newsdetailstamil,
                  img: data.g_image, imgURL: this._dataSharing.imgURL + data.g_image,
                  hasImg: (data.g_image && data.g_image !== '') ? true : false,
                  storyId: data.g_slno
                  // smallImgURL
                }
              );
              setLeftCount++;
            }
         
      } else {
        console.log('error occurred');
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) { }
    });
  }
})
  }
  onNavigate(data: any) {
    this._router.navigate(['/newscontent'], { queryParams: { storyid: data.storyId } });
  }
}
  
  

  
