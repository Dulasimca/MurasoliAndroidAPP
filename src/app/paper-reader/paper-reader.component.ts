import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-paper-reader',
  templateUrl: './paper-reader.component.html',
  styleUrls: ['./paper-reader.component.scss']
})
export class PaperReaderComponent implements OnInit, OnChanges {
  display: boolean = false;
  title: any;
  news: any;
  @ViewChild('popup', {static: false}) popup!: Dialog;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    var el: any = document.getElementById('container')?.childNodes;
    var divArray: any[] = el[0].children[0].children;
    for (const i of divArray) {
      i.onmouseover = () => {
        if(i.getAttribute('alt') == 'Rectangle') {
          this.setValue('');
        } else {
         this.setValue(i.getAttribute('alt'));
        }
         (<HTMLElement>i).style.background = "#ADD8E6";
      };
      i.onclick = () => this.open();
      i.onmouseout = () => {
        (<HTMLElement>i).style.background = "transparent";
      };
    }
  }

  setValue(value: string) {
    // this.title = value;
    this.news = value;
  }

  open() {
    if(this.news != '' && this.news != null && this.news != undefined) {
    this.display = true;
    }
  }

  close() {
    this.display = false;
    this.title = null;
    this.news = null;
  }

  ngOnChanges() {
    var el: any = document.getElementById('container')?.childNodes;
    var divArray: any[] = el[0].children[0].children;
    for (const i of divArray) {
      i.onclick = function () {
        this.display = true;
      };
    }
    this.cdr.detectChanges();
  }

}
