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
  selector: 'app-world-news',
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.scss']
})
export class WorldNewsComponent implements OnInit {

  newsDetails: any[] = [];
  newsAllData: any[] = [];
  title: string = 'உலக செய்திகள்';
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
    private _newsService: NewsService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.loader = true;
    const params = new HttpParams().append('slno','4');
    this._restApiService.getByParameters('MainNewsEntryWorld/GetMainNewsEntrybyworldId',params).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.loader = false;
        if(res.Table.length !==0){
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
        this.showPaginator = false
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    }else{
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
        this.data = this.newsDetails.slice(0, 3);
        this.pageNo = 1;
        break;
      case 'L':
        this.data = this.newsDetails.slice(len - 3, len);
        this.pageNo = (Math.round((len / 3) * 1) == 0) ? 1 : Math.round((len / 3) * 1);
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

  onNavigate(data: any) {
    this._router.navigate(['/newscontent'], {queryParams: { storyid: data.storyId }});
  }

}
