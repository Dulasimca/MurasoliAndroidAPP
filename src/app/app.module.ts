import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { SpeedDialModule } from 'primeng/speeddial';
import { PaginatorModule } from 'primeng/paginator';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { DistrictNewsComponent } from './district-news/district-news.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EPaperComponent } from './e-paper/e-paper.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from './services/auth.service';
import { RestapiService } from './services/restapi.service';
import { PaperReaderComponent } from './paper-reader/paper-reader.component';
import { DataSharingService } from './services/data-sharing.service';
import { Converter } from './helper/converter';
import { AuthGuard } from './services/auth.guard';
import { NewsService } from './services/news.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MessageService } from 'primeng/api';
import { FooterComponent } from './footer/footer.component';
import { StateNewsComponent } from './state-news/state-news.component';
import { HomeeditionComponent } from './homeedition/homeedition.component';
import { HomeeditionchennaiComponent } from './homeeditionchennai/homeeditionchennai.component';
import { HomeeditioncoimbatoreComponent } from './homeeditioncoimbatore/homeeditioncoimbatore.component';
import { HomeeditionmaduraiComponent } from './homeeditionmadurai/homeeditionmadurai.component';
import { HomeComponent } from './home/home/home.component';
import { HomeeditiontrichyComponent } from './homeeditiontrichy/homeeditiontrichy.component';
import { WorldNewsComponent } from './world-news/world-news.component';
import { HomeadditionalComponent } from './homeadditional/homeadditional.component';
import { AboutMaranComponent } from './about-maran/about-maran.component';
import { AccordionModule} from 'primeng/accordion';
import { EditorialComponent } from './editorial/editorial.component'
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { PanelModule } from 'primeng/panel';
import { PathipuMobileComponent } from './pathipu-mobile/pathipu-mobile.component';
import { NewsMobileComponent } from './news-mobile/news-mobile.component';
import { SearchComponent } from './search/search.component';
import { InaugurationPageComponent } from './inauguration-page/inauguration-page.component';
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    NewsComponent,
    NewsDetailComponent,
    DistrictNewsComponent,
    AboutComponent,
    ContactUsComponent,
    EPaperComponent,
    PaperReaderComponent,
    FooterComponent,
    StateNewsComponent,
    HomeeditionComponent,
    HomeeditionchennaiComponent,
    HomeeditioncoimbatoreComponent,
    HomeeditionmaduraiComponent,
    HomeeditiontrichyComponent,
    WorldNewsComponent,
    HomeadditionalComponent,
    AboutMaranComponent,
    EditorialComponent,
    SkeletonLoaderComponent,
    PathipuMobileComponent,
    NewsMobileComponent,
    SearchComponent,
    InaugurationPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MenubarModule,
    DropdownModule,
    HttpClientModule,
    PdfViewerModule,
    DialogModule,
    CalendarModule,
    NgxExtendedPdfViewerModule,
    SpeedDialModule,
    PaginatorModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    TabViewModule,
    TableModule,
    CardModule,
    AccordionModule,
    ProgressSpinnerModule,
    SkeletonModule,
    PanelModule,
    BlockUIModule,
  ],
  entryComponents: [],
  providers: [AuthService, RestapiService, DatePipe, DataSharingService, Converter, AuthGuard, NewsService, MessageService,AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
