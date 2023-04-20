import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgxExtendedPdfViewerService, pdfDefaultOptions, TextLayerRenderedEvent } from 'ngx-extended-pdf-viewer';
import { DataSharingService } from '../services/data-sharing.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsService } from '../services/news.service';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RestapiService } from '../services/restapi.service';
import { R3SelectorScopeMode } from '@angular/compiler';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../common-module/messages';
@Component({
  selector: 'app-e-paper',
  templateUrl: './e-paper.component.html',
  styleUrls: ['./e-paper.component.scss']
})
export class EPaperComponent implements OnInit {
  src: any;
  districts?: any = [];
  districtOptions: SelectItem[] = [];
  district: any;
  date: Date = new Date();
  items: any = [];
  layers: any;
  filename: any = [];
  murasolifilename: any;
  murasolipdffilepath: any;
  public enablePinchOnMobile = true;
  editionMapping: any;

  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width',
    0.5, 0.67, 0.75, 0.82, 0.9, 1, 1.1, 1.15,
    1.25, 1.5];
  urlSafe: any;
   
  constructor(private _dataSharing: DataSharingService, private _pdfService: NgxExtendedPdfViewerService,
    private sanitizer: DomSanitizer, private _newsService: NewsService, private _datepipe: DatePipe,
    private _restApiService: RestapiService,private messageService: MessageService) {
    pdfDefaultOptions.defaultZoomValue = '90%'
    pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5;
  }

  public exportAsText(pageNum: number): void {
    (async () => {
      const text = await this._pdfService.getPageAsText(pageNum);
      
    })();
  }
  
  pageChange($event: any) { this.exportAsText($event); };

  ngOnInit(): void {
    this._newsService.getDistrict();
    //this.murasolipdffilepath =this._dataSharing.fileURL; 
     this.murasolipdffilepath =this._dataSharing.fileURL;
    this.murasolifilename = 'empty.pdf';
    this.src = this.murasolipdffilepath + this.murasolifilename ;
    console.log(this.src)     
    this._restApiService.get('EditionMapping/GetEditionMapping').subscribe(res => {
      this.editionMapping = res.Table
    })
    this.items = [
      {
        icon: 'pi pi-facebook',
        command: () => {
          this.share('_FB');
        }
      },
      {
        icon: 'pi pi-twitter',
        command: () => {
          this.share('_TW');
        }
      },
      {
        icon: 'pi pi-send',
        command: () => {
          this.share('_TG');
        }
      },
      {
        icon: 'pi pi-whatsapp',
        command: () => {
          this.share('_WA');
        }
      },
    ];
  }

 onSelectDistrict() {
    // var data: any = [];
    // this.districts = this._newsService.district;
    // if (this.districts) {
    //   this.districts.Table.forEach((d: any) => {
    //     data.push({ label: d.g_districtnametamil, value: d.g_districtid, engLabel: d.g_districtnametamil });
    //   })
    //   this.districtOptions = data;
    // }
    var data: any = [];
    this.editionMapping.forEach((i: any) => {
      data.push({ label: i.g_districtnametamil, value: i.g_districtid, engLabel: i.g_districtnametamil });
    })
      this.districtOptions = data;
  }

  loadPDF() {
    if(this.district !== undefined && this.district !== null && this.date !== undefined &&
      this.date !== null) {
    const params = new HttpParams().append('_districtid', this.district).set('_date', this._datepipe.transform(this.date, 'yyyy-MM-dd') as any);
    this._restApiService.getByParameters('DailyNewsPaper/GetDailyNewsPaperbyDate', params).subscribe(res => {
      console.log(res)
      if(res.Table[0] !== undefined && res.Table[0] !== null) {
        var data = res.Table[0];
        this.src = this.murasolipdffilepath + data.g_filename ;
        console.log(this.src)          
      }
      else{       
       this.src = this.murasolipdffilepath + 'empty.pdf' ;
       this.messageService.clear();
       this.messageService.add({
         key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
         summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.NoRecordMessage
       });        
      }
    })
  }
  }

  highlightWords($event: any) {
    $event.source.enhanceTextSelection = true;
  }

  share(type: string) {
    const shareUrl = this._dataSharing.fileURL + this.src ;
    let returnValue = null;
    returnValue = this._dataSharing.shareNews(type, shareUrl);
    return returnValue;
  }

}
