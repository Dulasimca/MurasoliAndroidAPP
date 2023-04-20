import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DistrictNewsComponent } from './district-news/district-news.component';
import { StateNewsComponent } from './state-news/state-news.component';
import { EPaperComponent } from './e-paper/e-paper.component';
import { HomeComponent } from './home/home.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { PaperReaderComponent } from './paper-reader/paper-reader.component';
import { AuthGuard } from './services/auth.guard';
import { HomeeditionComponent } from './homeedition/homeedition.component';
import { HomeeditionchennaiComponent } from './homeeditionchennai/homeeditionchennai.component';
import { HomeeditioncoimbatoreComponent } from './homeeditioncoimbatore/homeeditioncoimbatore.component';
import { HomeeditionmaduraiComponent } from './homeeditionmadurai/homeeditionmadurai.component';
//import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';

const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'reader', component: PaperReaderComponent },
    { path: 'news', component: NewsComponent },
    { path: 'district-news', component: DistrictNewsComponent },
    { path: 'state-news', component: StateNewsComponent },
    { path: 'state-news', component: DistrictNewsComponent },
    { path: 'newscontent', component: NewsDetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact-us', component: ContactUsComponent},
    { path: 'e-paper', component: EPaperComponent},
    { path: 'homeedition', component: HomeeditionComponent}, 
    { path: 'homeeditionchennai', component: HomeeditionchennaiComponent},
    { path: 'homeeditioncoimbatore', component: HomeeditioncoimbatoreComponent}, 
    { path: 'homeeditionmadurai', component: HomeeditionmaduraiComponent},  
   
    //{ path: 'p-paper', component: ExamplePdfViewerComponent} 
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  