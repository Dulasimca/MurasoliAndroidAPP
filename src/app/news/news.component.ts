import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { delay, of, tap } from 'rxjs';
// import { Converter } from '../helper/converter';
// import { DataSharingService } from '../services/data-sharing.service';
import { NewsService } from '../services/news.service';
import { RestapiService } from '../services/restapi.service';
import { HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../common-module/messages';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  title: string = 'தேசிய செய்திகள்';
  newsList: any = [];
  data: any[] = [];
  pageNo: number = 1;
  stateno: any = '';
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _restApiService: RestapiService, private _newsService: NewsService,private messageService: MessageService) { 
    // this._activatedRoute.queryParams.subscribe(params => {
    //   this.title = (params['id'] === '1') ? 'மாநில செய்திகள்' : 'தேசிய செய்திகள்';
      
    // });
  }
  ngOnInit(): void {
   
    // this.title === 'தேசிய செய்திகள்'
    // this.stateno =  1 ; 
    this.loadNews()    
  };
  loadNews() {
    //new line change for fletching statenews /central news
    
    const params = new HttpParams().append('slno',1);    
    this._restApiService.getByParameters('MainNewsEntryState/GetMainNewsEntrybystateId',params).subscribe(res => {
    //this._restApiService.get('MainNewsEntry/GetMainNewsEntry').subscribe(res => {
      if(res) {
       var response = this._newsService.createObject(res.Table);        
        response.forEach((i: any, index: number) => {
          i.id = index + 1;
        })
        this.newsList = [];
        this.data = [];
        this.newsList = response.slice(0);
        this.data = this.newsList.slice(0, 3);
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
    let len = this.newsList.length;
    switch(value) {
      case 'F':
        this.data = this.newsList.slice(0, 3);
        this.pageNo = 1;
        break;
      case 'L':
        this.data = this.newsList.slice(len - 3, len);
        this.pageNo = Math.round((len / 3) * 1);
        //this.pageNo = Math.round((len / 3) * 1) + 1;
        break;
      case 'P':
        let index = this.data[0].id;
        if(index > 1) {
        this.data = this.newsList.slice(index - 4, index - 1);
        this.data = this.data.slice(0);
        this.pageNo -= 1;
        }
        break;
      case 'N':
        let ind = this.data[2].id;
        if(ind < len) {
        this.data = this.newsList.slice(ind, ind + 3);
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
