import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { WhatsNewComponent } from './whats-new/whats-new.component';
import { AboutAndContactComponent } from './about-and-contact/about-and-contact.component';
import { ContactComponent } from './contact/contact.component';
import { SmallAboutComponent } from './small-about/small-about.component';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImagesComponent } from './images/images.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    SideNavbarComponent,
    WhatsNewComponent,
    AboutAndContactComponent,
    ContactComponent,
    SmallAboutComponent,
    ContentComponent,
    GalleryComponent,
    ImagesComponent,
    CategoryMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ContentComponent},
      {path: 'gallery', component: GalleryComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
