import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-example-pdf-viewer',
  templateUrl: './example-pdf-viewer.component.html',
  styleUrls: ['./example-pdf-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePdfViewerComponent {
  src: any;
  
  districtOptions: SelectItem[] = [];
  district: any;
  date: Date = new Date();
  /** In most cases, you don't need the NgxExtendedPdfViewerService. It allows you
   *  to use the "find" api, to extract text and images from a PDF file,
   *  to print programmatically, and to show or hide layers by a method call.
  */
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    /* More likely than not you don't need to tweak the pdfDefaultOptions.
       They are a collecton of less frequently used options.
       To illustrate how they're used, here are two example settings: */
    pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
    // but most devices support much higher resolutions.
    // Increasing this setting allows your users to use higher zoom factors,
    // trading image quality for performance.

    
    }
    ngOnInit(): void {
      this.src = 'assets/files/1-96403257-08.12.2022.pdf';
      this.districtOptions = [
        { label: 'சென்னை', value: '0' },
        { label: 'கோயம்புத்தூர்', value: '1' },
        { label: 'மதுரை', value: '2' },
      ];
    }
    onSelectDistrict() { }
}
