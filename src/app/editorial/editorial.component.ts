import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RestapiService } from '../services/restapi.service';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../common-module/messages';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.scss']
})

export class EditorialComponent implements OnInit {

  Date: Date = new Date();  
  content: any = [];
  mainNewsdata: any[] = [];
  loader: boolean = false;
  data: any[] = [];
  newsDetails: any;
  url: string = '';
  newsTopic: any;
  maxDate: any;
  Date1: any;
  hidetxt: boolean = false;
  showPresentDate: boolean = true;

  constructor(private restApiService: RestapiService, private messageService: MessageService,
  private datePipe: DatePipe, private authService: AuthService) { }

  ngOnInit(): void {
    this.dateChecking();
    this.onView();
  }

  dateChecking() {
    this.restApiService.get('EditorialMaxDate/GetEditorialMaxDate').subscribe(res => {
      if (res !== null && res !== undefined) {
        this.loader = false;
          this.maxDate = this.datePipe.transform(res.Table[0].g_date,'yyyy-MM-dd')
      }  else {
        this.loader = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    });
  }

  onView() {
    this.newsTopic = [];
    this.newsDetails = [];
    this.loader = true;
    const params = {
      'date': this.datePipe.transform(this.Date,'yyyy-MM-dd')
    }
    this.restApiService.getByParameters('EditorialByDate/GetEditorialByDate', params).subscribe(res => {
      if (res !== null && res !== undefined) {
        this.Date1 = this.datePipe.transform(this.Date,'yyyy-MM-dd')
        this.loader = false;
        if (res.Table.length !== 0) {
          console.log('t1')
        this.hidetxt = false;
          res.Table.forEach((i: any) => {
            this.newsDetails =  i.g_newsdetails ;
            this.newsTopic = i.g_newstitle;
          })
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: 'தாங்கள் தேடிய' + this.Date1 + 'தேதியில் பதிவு காணப்படவில்லை'
          });
          this.loader = false;
          const params = {
            'date': this.maxDate
          }
          this.restApiService.getByParameters('EditorialByDate/GetEditorialByDate', params).subscribe(res => {
            if (res !== null && res !== undefined) {
              if (res.Table.length !== 0) {
                this.hidetxt = true;
                res.Table.forEach((i: any) => {
                  this.newsDetails =  i.g_newsdetails ;
                  this.newsTopic = i.g_newstitle;
                })
              } else {
                this.messageService.clear();
                this.messageService.add({
                  key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
                  summary: ResponseMessage.SUMMARY_WARNING, detail: 'தாங்கள் தேடிய' + this.Date1 + 'தேதியில் பதிவு காணப்படவில்லை'
                });
              }
            }
          })         
        }
      }  else {
        this.loader = false;
        // this.messageService.clear();
        // this.messageService.add({
        //   key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
        //   summary: ResponseMessage.SUMMARY_WARNING, detail: 'தாங்கள் தேடிய' + this.Date1 + 'தேதியில் பதிவு காணப்படவில்லை'
        // });
      }
    });
  }
}
