import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Meta, Title  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy  } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpParams } from '@angular/common/http';
      

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './template/layout/layout.component';
import { HeaderComponent } from './shared/partials/header/header.component';
import { FooterComponent } from './shared/partials/footer/footer.component';

import { CarouselComponent } from './shared/partials/carousel/carousel.component';

// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

// import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";


import { JwtauthInterceptor } from './core/interceptor/jwtauth.interceptor';
import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,   
    FooterComponent,
    PagenotfoundComponent,
    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    CarouselComponent,
    // SlickCarouselModule,
    // NgxBootstrapSliderModule,
    HeaderComponent,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Meta, Title, {provide: HTTP_INTERCEPTORS, useClass: JwtauthInterceptor, multi: true}, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

