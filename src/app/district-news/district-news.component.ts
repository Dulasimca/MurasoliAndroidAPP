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
  selector: 'app-district-news',
  templateUrl: './district-news.component.html',
  styleUrls: ['./district-news.component.scss']
})
export class DistrictNewsComponent implements OnInit {
  newsDetails: any[] = [];
  newsAllData: any[] = [];
  title: string = 'மாவட்ட செய்திகள்';
  districtOptions: SelectItem[] = [];
  district: any;
  districts?: any = [];
  totalRecords: number = 0;
  first: number = 1;
  data: any[] = [];
  pageNo: number = 1;
  showPaginator: boolean = false;
  loader: boolean = false;
  districtid: string ="";
  constructor(private _router: Router, private _restApiService: RestapiService,
    private _newsService: NewsService, private messageService: MessageService) { }

  ngOnInit(): void {
    // this.loadNews();
    this._newsService.getDistrict();
    this.districtid = '3';
    // this.district.value = 3;
    // this.loadNews();
  }

  loadNews() {
    this.loader = true;
    this.newsDetails = [];
     this.data = [];
    this.loader = true;
    const params = new HttpParams().append('slno', this.district.value);
    this._restApiService.getByParameters('MainNewsEntryDistrict/GetMainNewsEntrybyDistrictId', params).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.loader = false;
        if (res.Table.length !== 0) {
          this.loader = false;
          this.showPaginator = true;
          var response = this._newsService.createObject(res.Table);
          var response = res.Table;
          response.forEach((i: any, index: number) => {
            i.id = index + 1;
          })
          this.newsDetails = [];
          this.newsDetails = response.slice(0);
          this.newsAllData = this.newsDetails.slice(0);
          this.data = this.newsDetails.slice(0, 3);
        } else {
          this.loader = false;
          this.showPaginator = false;
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          });
        }
      } else {
        this.loader = false;
        this.showPaginator = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    });
  }

  goto(value: string) {
    let len = this.newsDetails.length;
    switch(value) {
      case 'F':
        //First Page(F) -> we will always show first 5 data here, 
        //so sliced first 5 from all the record to show in first page i.e) pagenum=1
        this.data = this.newsDetails.slice(0, 5);
        this.pageNo = 1;
        break;
      case 'L':
        //Last Page(L) -> we will show remaining last data here, 
        //so dividing whole data by 5 and getting reminder.
        // and subracting reminder from total length of data to load actual data
        // calculate quotient, if it has decimal then add 1 to pageno calculation or just 
        //roundoff total length by 5
         var rem = len % 5;
        const hasDecimal = ((len / 5) % 1) > 0 ? false : true;
        this.pageNo = (((len / 5) * 1) <= 1) ? 1 : (hasDecimal ? ((Math.round((len / 5) * 1))) : (Math.round((len / 5) * 1))+1);
        rem = rem == 0 ? 5 : rem;
        this.data = this.newsDetails.slice(len - rem, len);
        break;
      case 'P':
        //Previous(P) -> here taking first id of current data of current page 
        // and calculating start and end index to slice the total data to show in previous page
        let index = this.data[0].id;
        if(index > 1) {
        this.data = this.newsDetails.slice(index - 6, index - 1);
        this.data = this.data.slice(0);
        this.pageNo -= 1;
        }
        break;
      case 'N':
        //Next(N) -> here taking last id of current data of current page 
        // and calculating start and end index to slice the total data to show in next page
        let ind = this.data[this.data.length-1].id;
        if(ind < len) {
        this.data = this.newsDetails.slice(ind, ind + 5);
        this.data = this.data.slice(0);
        this.pageNo += 1;
      } 
        break;
    }
  }

  onChangeDistrict() {
    this.title = this.district.label;
    this.districtid=this.district.value;
    this.loadNews()
    // const filteredData = this.newsAllData.filter(f => {
    //   return (f.g_district * 1) === (this.district.value * 1);
    // });
    // this.newsDetails = filteredData;
    // this.data = filteredData.slice(0, 3);
  }

  onSelectDistrict() {
    var data: any = [];
    this.districts = this._newsService.district;
    if (this.districts) {
      this.districts.Table.forEach((d: any) => {
        data.push({ label: d.g_districtnametamil, value: d.g_districtid, engLabel: d.g_districtnametamil });
      })
      this.districtOptions = data;
    }
  }

  onNavigate(data: any) {
    
    this._router.navigate(['/newscontent'], { queryParams: { storyid: data.storyId } });
  }

}
