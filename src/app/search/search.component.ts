import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
  indexno: any = 0;
  pageNo: number = 1;
  districtnewsCols: any = [];
  loader: boolean = false;
  showPaginator: boolean = false;
  searchText: any;
  @Input() newsShort: string='';
  translateData: any;


  isAlphabet(input: string): boolean {
    const alphabetPattern = /^[A-Za-z]+$/;
    return alphabetPattern.test(input);
  }
 
  constructor(private _router: Router, private _restApiService: RestapiService,
    private messageService: MessageService,private _authService: AuthService, private _newsService: NewsService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    
  //  this.pageNo = this._newsService.getGlobalPageNum();
    this._authService.home();
    // this.loadContent()
    // this.indexno = this.tabIndex;
    // this.callData();
    this.searchData();
  }

  searchData() {
    //if(this.searchText.length > 0) {
      this.loadSearchData();     
    //} else {

    //}
  }
  loadSearchData() {
    this.loader = true;
    this.newsDetails = [];
    this.data = [];
    this.newsAllData = [];
    this.searchText = "";
    this.route.queryParams.subscribe(params => {
      this.newsDetails = [];
      this.data = [];
      this.newsAllData = [];
      this.searchText = params['search'];
      if (this.searchText !== undefined && this.searchText !== null && this.isAlphabet(this.searchText)) {
       this.onTranslate();
      } else {
        const params = new HttpParams().append('searchtext', this.searchText);
        this._restApiService.getByParameters('SearchData/GetSearchDataByName', params).subscribe(res => {
          if (res !== null && res !== undefined) {
            this.loader = false;
            if (res.Table.length !== 0) {
              this.showPaginator = true;
              this.loader = false;
              var response = this._newsService.createObject(res.Table);
              var response = res.Table;
              this.newsDetails = response.slice(0);
              this.newsAllData = this.newsDetails.slice(0);
              this.data = this.newsDetails.slice(0, 3);
            } else {
              this.showPaginator = false;
              this.loader = false;
              this.messageService.add({
                key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
                summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
              });
            }
          } else {
            this.errorMessage();
          }
        });
      }
    });
  }

  onTranslate() {
    // this.searchText = '';
    this.showPaginator = false;
    const params ={
      'english': this.searchText
    }
    console.log('txt',this.searchText)
    this._restApiService.getByParameters('Translation/GetTranslation', params).subscribe(res => {
      console.log(1)
      if(res !== undefined && res !== null) {
        if (res.Table.length !== 0) { 
          console.log(res)
          if (this.searchText.toLowerCase() == res.Table[0].eng.toLowerCase()) {
            this.searchText = res.Table[0].tam;
            //this.translateData = res;
            const params = new HttpParams().append('searchtext', this.searchText);
            this._restApiService.getByParameters('SearchData/GetSearchDataByName', params).subscribe(res => {
              if (res !== null && res !== undefined) {
                this.loader = false;
                if (res.Table.length !== 0) {
                  this.showPaginator = true;
                  this.loader = false;
                  var response = this._newsService.createObject(res.Table);
                  var response = res.Table;
                  response.forEach((i: any, index: number) => {
                    i.id = index + 1;
                  })
                  this.newsDetails = response.slice(0);
                  this.newsAllData = this.newsDetails.slice(0);
                  //start and end index to load data while navigating to this page 
                  //i.e) to show data already shown before navigation from this page, since
                  // we're loading 5 data in each page, I've made calculation accordingly!
                const endIndex = (this.pageNo * 5);
                const startIndex = (this.pageNo == 1 ? 0 : (endIndex - 5));
                this.data = this.newsDetails.slice(startIndex, endIndex);
                } else {
                  this.showPaginator = false;
                  this.loader = false;
                  this.messageService.add({
                    key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
                    summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
                  });
                }
              } else {
                this.errorMessage();
              }
            });
          } else {
            this.loader = false;
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
              summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
            });
          }
        }
        else {
          this.loader = false;
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
        }
      } else {
        this.loader = false;
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    })
  }
  errorMessage()
{
  this.showPaginator = false;
  this.loader = false;
  this.messageService.clear();
  this.messageService.add({
    key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
    summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage

  });
}
onNavigate(data: any) {
  this._newsService.setGlobalPagNum(this.pageNo);
  this._router.navigate(['/newscontent'], { queryParams: { storyid: data.storyId } });
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
      this.pageNo = (Math.round((len / 5) * 1) == 0) ? 1 : (hasDecimal ? ((Math.round((len / 5) * 1))) : (Math.round((len / 5) * 1))+1);
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
}
