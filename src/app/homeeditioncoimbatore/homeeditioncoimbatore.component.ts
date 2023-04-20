import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Converter } from '../helper/converter';
import { AuthService } from '../services/auth.service';
import { DataSharingService } from '../services/data-sharing.service';
import { NewsService } from '../services/news.service';
import { Table } from 'primeng/table';
import { RestapiService } from '../services/restapi.service';
import { TabView } from 'primeng/tabview';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../common-module/messages';

@Component({
  selector: 'app-homeeditioncoimbatore',
  templateUrl: './homeeditioncoimbatore.component.html',
  styleUrls: ['./homeeditioncoimbatore.component.scss']
})
export class HomeeditioncoimbatoreComponent implements OnInit {
    firstColData: any = [];
    secondColData: any = [];
    thridColData: any = [];
    secondMainColData: any = [];
    bottomNewsData: any = [];
    NewsData: any[] = [];
    newsDetails: any[] = [];
    newsAllData: any[] = [];
    newsList: any = [];
    data: any[] = [];
    breakingNews: string = '';
    tabIndex: number = 0;
    indexno: any =0;
    pageNo: number = 1;
    districtnewsCols:  any = [];
    constructor(private _router: Router, private _restApiService: RestapiService,
      private _dataSharing: DataSharingService, private _datepipe: DatePipe,
      private _converter: Converter, private _authService: AuthService, private _newsService: NewsService,
      private messageService: MessageService) { }
  
  
    ngOnInit(): void {
      this._authService.home();
      this.loadContent()
      this.districtnewsCols = [
        {header:'HeadLine', field:'headLine',},
        {header:'Short', field:'newsShort'},
        {header:'image', field:'imgURL'},
        {header:'link', field:'storyId'},
       ]
      this.loadContentcoimbatore();
      this.indexno = this.tabIndex;
      this.callData()
    }
    loadContent() {
      this._restApiService.get('FlashNewsEntry/GetFlashNewsEntry').subscribe(res => {
        res.Table.forEach((i: any) => {
          this.breakingNews += i.g_newsdetailstamil + ' ,';
        });
      });
    }
    callData(){
         this.indexno = this.tabIndex;
         if (this.indexno === 0){
          //this.loadContentchennai()
         }else if (this.indexno === 1){
          //this.loadContentmadurai()
         }else if (this.indexno === 2){
          this.loadContentcoimbatore()
         }
    }
     
   
    loadContentcoimbatore() { 
      this.newsDetails = []    
      this._restApiService.get('FlashNewsEntry/GetFlashNewsEntry').subscribe(res => {
        res.Table.forEach((i: any) => {
          this.breakingNews += i.g_newsdetailstamil + ' ,';
        });
      });
      const params = new HttpParams().append('slno',3);    
      this._restApiService.getByParameters('MainNewsEntryEdition/GetMainNewsEntrybyeditionId',params).subscribe(res => {
      //this._restApiService.get('MainNewsEntry/GetMainNewsEntry').subscribe(res => {
        if(res) {
          var response = this._newsService.createObject(res.Table);  
          var response = res.Table;      
           response.forEach((i: any, index: number) => {
             i.id = index + 1;
           })
           this.newsDetails = response.slice(0);
           this.newsAllData = this.newsDetails.slice(0);
           this.data = this.newsDetails.slice(0);
         
         }else{
           this.newsDetails = []
           console.log('True')
           this.messageService.clear();
           this.messageService.add({
             key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
             summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.NoRecordMessage
             
           });
           }
           });
    }
    onNavigate(data: any) {
      this._router.navigate(['/newscontent'], {queryParams: { storyid: data.storyId }});
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
    
  
  }
  

