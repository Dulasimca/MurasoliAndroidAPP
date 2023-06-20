import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DistrictNewsComponent } from './district-news/district-news.component';
import { StateNewsComponent } from './state-news/state-news.component';
import { EPaperComponent } from './e-paper/e-paper.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { PaperReaderComponent } from './paper-reader/paper-reader.component';
import { AuthGuard } from './services/auth.guard';
import { HomeeditionComponent } from './homeedition/homeedition.component';
import { HomeeditionchennaiComponent } from './homeeditionchennai/homeeditionchennai.component';
import { HomeeditioncoimbatoreComponent } from './homeeditioncoimbatore/homeeditioncoimbatore.component';
import { HomeeditionmaduraiComponent } from './homeeditionmadurai/homeeditionmadurai.component';
import { HomeComponent } from './home/home/home.component';
import { HomeeditiontrichyComponent } from './homeeditiontrichy/homeeditiontrichy.component';
import { WorldNewsComponent } from './world-news/world-news.component';
import { HomeadditionalComponent } from './homeadditional/homeadditional.component';
import { AboutMaranComponent } from './about-maran/about-maran.component';
import { EditorialComponent } from './editorial/editorial.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
//import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { PathipuMobileComponent } from './pathipu-mobile/pathipu-mobile.component';
import { NewsMobileComponent } from './news-mobile/news-mobile.component';
import { SearchComponent } from './search/search.component';
import { ScrollerToType } from 'primeng/scroller';
import { ScrollModeType } from 'ngx-extended-pdf-viewer';
import { InaugurationPageComponent } from './inauguration-page/inauguration-page.component';


const routes: Routes = [
    { path: '',   redirectTo: '/inauguration-page', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'reader', component: PaperReaderComponent },
    { path: 'news', component: NewsComponent },
    { path: 'district-news', component: DistrictNewsComponent },
    { path: 'state-news', component: StateNewsComponent },
    // { path: 'state-news', component: DistrictNewsComponent },
    { path: 'newscontent', component: NewsDetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact-us', component: ContactUsComponent},
    { path: 'e-paper', component: EPaperComponent},
    { path: 'homeedition', component: HomeeditionComponent}, 
    { path: 'chennaiedition', component: HomeeditionchennaiComponent},
    { path: 'coimbatoreedition', component: HomeeditioncoimbatoreComponent}, 
    { path: 'maduraiedition', component: HomeeditionmaduraiComponent},  
    { path: 'trichyedition', component: HomeeditiontrichyComponent}, 
    { path: 'world-news', component: WorldNewsComponent},  
    { path: 'homeadditional', loadChildren: () => HomeadditionalComponent}, 
    { path: 'aboutmaran', component: AboutMaranComponent},
    { path: 'editorial', component: EditorialComponent},
    { path: 'aboutmaran', component: AboutMaranComponent},  
    { path: 'skeleton', component: SkeletonLoaderComponent},
    {path: 'pathipumobile', component:PathipuMobileComponent},
    {path: 'newsmobile', component:NewsMobileComponent},
    {path: 'search', component:SearchComponent},
    {path: 'inauguration-page', component:InaugurationPageComponent}
    
    





   
    //{ path: 'p-paper', component: ExamplePdfViewerComponent} 
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  