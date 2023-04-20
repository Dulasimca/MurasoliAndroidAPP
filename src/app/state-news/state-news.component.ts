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
  selector: 'app-state-news',
  templateUrl: './state-news.component.html',
  styleUrls: ['./state-news.component.scss']
})
export class StateNewsComponent implements OnInit {
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
  constructor(private _router: Router, private _restApiService: RestapiService,
    private _newsService: NewsService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadNews();
    //this._newsService.getDistrict();
  }

  loadNews() {
    const params = new HttpParams().append('slno','2');
    
    this._restApiService.getByParameters('MainNewsEntryState/GetMainNewsEntrybystateId',params).subscribe(res => {
      if (res) {
        var response = this._newsService.createObject(res.Table);
        var response = res.Table;
        response.forEach((i: any, index: number) => {
          i.id = index + 1;
        })
        this.newsDetails = [];
        this.newsDetails = response.slice(0);
        this.newsAllData = this.newsDetails.slice(0);
        this.data = this.newsDetails.slice(0, 3);
      }else{
        console.log('True')
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.NoRecordMessage
        });
      }
    });
  }

  goto(value: string) {
    let len = this.newsDetails.length;
    switch(value) {
      case 'F':
        this.data = this.newsDetails.slice(0, 3);
        this.pageNo = 1;
        break;
      case 'L':
        this.data = this.newsDetails.slice(len - 3, len);
        this.pageNo = Math.round((len / 3) * 1) ;
        break;
      case 'P':
        let index = this.data[0].id;
        if(index > 1) {
        this.data = this.newsDetails.slice(index - 4, index - 1);
        this.data = this.data.slice(0);
        this.pageNo -= 1;
        }
        break;
      case 'N':
        let ind = this.data[2].id;
        if(ind < len) {
        this.data = this.newsDetails.slice(ind, ind + 3);
        this.data = this.data.slice(0);
        this.pageNo += 1;
      } 
        break;
    }
  }

  // onChangeDistrict() {
  //   this.title = this.district.label;
  //   this.loadNews()
  //   const filteredData = this.newsAllData.filter(f => {
  //     return (f.g_district * 1) === (this.district.value * 1);
  //   });
  //   this.newsDetails = filteredData;
  //   this.data = filteredData.slice(0, 3);
  // }

  // onSelectDistrict() {
  //   var data: any = [];
  //   this.districts = this._newsService.district;
  //   if (this.districts) {
  //     this.districts.Table.forEach((d: any) => {
  //       data.push({ label: d.g_districtnametamil, value: d.g_districtid, engLabel: d.g_districtnametamil });
  //     })
  //     this.districtOptions = data;
  //   }
  // }

  onNavigate(data: any) {
    this._router.navigate(['/newscontent'], {queryParams: { storyid: data.storyId }});
  }

}
