import { TemplateRef, Component, NgModule, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CarouselComponent } from '../../shared/partials/carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountUpModule } from 'ngx-countup';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbProgressbarModule, ModalDismissReasons, NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';


import { SlideroneComponent } from '../../shared/partials/sliderone/sliderone.component';
import { SliderequipmentComponent } from '../../shared/partials/sliderequipment/sliderequipment.component';
import { SliderclientComponent } from '../../shared/partials/sliderclient/sliderclient.component';
import { SlidertestimonialsComponent } from '../../shared/partials/slidertestimonials/slidertestimonials.component';
import { SliderteamComponent } from '../../shared/partials/sliderteam/sliderteam.component';
import { VideomodalComponent } from '../../shared/partials/videomodal/videomodal.component';
import { BlogsComponent } from '../../shared/partials/blogs/blogs.component';

import { GlobalService } from '../../shared/global.service';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { SafeurlPipe } from '../../core/services/safeurl.pipe';


import * as anime from 'animejs';

declare var tanime: any; 

import AOS from 'aos';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

// new PureCounter();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselComponent,
     SlickCarouselModule,
      SlideroneComponent, SliderequipmentComponent, NgbProgressbarModule, SliderclientComponent, SlidertestimonialsComponent, SliderteamComponent, VideomodalComponent, CountUpModule, RouterModule, SafeurlPipe, BlogsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent implements OnInit{

  countone = 200;
  duration = 5000;
  blogdta:any;  
  filepathblog:string=Constant.API_ENDPOINT+"blog/";
  filepathcounter:string=Constant.API_ENDPOINT+"site/";
  filepathpopup:string=Constant.API_ENDPOINT+"banner/";
  siteData:any ={};

  aboutHeading:any ={};
  supplierHeading:any ={};
  equipemtHeading:any ={};
  clientHeading:any ={};
  testiHeading:any ={};
  blogHeading:any ={};

  AboutMainTexts:any ={};
AboutFirstTexts:any ={};
AboutSecondTexts:any ={};


dta_sarvamites:number=0;
dta_customers:number=0;
dta_suppliers:number=0;
dta_products:number=0;

url:any;

@ViewChild('welcome') welcome : TemplateRef<any>;

  ngOnInit() {    
    // this.url = this.router.url.replace("/", "");
    // console.log(this.url);
    this.FetchSEOdata("home");

    AOS.init({disable: 'mobile', once:true});
    AOS.refresh();    
    // this.getblogdata();
    this.getSiteData();

    this.getAboutHeading();
    this.getSupplierHeading();
    this.getEquipemtHeading();
    this.getClientHeading();
    this.getTestiHeading();
    this.getBlogHeading();

    this.GetAboutMainTexts();
    this.GetAboutFirstTexts();
    this.GetAboutSecondTexts();

    this.GetWishCartCount();    

    this.getPopUpBan();

    
  }

 FetchSEOdata(url:any){
    this.api.fetchSeoData(url).subscribe((res) => {
      // console.log(res.response);
      if(res.success){
       
        this.titleService.setTitle(res.response.seo_title);
        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/home"});
        this.metaService.updateTag({ name: 'og:type', content: "Home Page"});        
        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
        this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
        this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/home");
        
      }else{
        // this.router.navigate(['page-not-found']);
      }     
    });
   
  }

// slides = [
//     { img: 'https://via.placeholder.com/600.png/09f/fff' },
//     { img: 'https://via.placeholder.com/600.png/021/fff' },
//     { img: 'https://via.placeholder.com/600.png/321/fff' },
//     { img: 'https://via.placeholder.com/600.png/422/fff' },
//     { img: 'https://via.placeholder.com/600.png/654/fff' },
//   ];
//   slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
//   addSlide() {
//     this.slides.push({ img: 'http://placehold.it/350x150/777777' });
//   }
//   removeSlide() {
//     this.slides.length = this.slides.length - 1;
//   }
//   slickInit(e: any) {
//     console.log('slick initialized');
//   }
//   breakpoint(e: any) {
//     console.log('breakpoint');
//   }
//   afterChange(e: any) {
//     console.log('afterChange');
//   }
//   beforeChange(e: any) {
//     console.log('beforeChange');
//   }

 


  constructor(private router: Router, private modalService: NgbModal, private api: ApiService, public loginHead: GlobalService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

  closeResult = '';

  openvideo(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' , size: 'lg'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openwelcome() {
    this.modalService.open('welcome', { ariaLabelledBy: 'modal-basic-title' , size: 'lg'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  
  popupban:any;
  popstat:number;
  getPopUpBan(){
    this.api.getpopupbanner().subscribe(res => {
     this.popupban= res.response.data;
     this.popstat= res.response.count;
     // console.log(res.response.count);

      if(this.popstat == 1){
        if(!sessionStorage.getItem('welcome')){
          setTimeout(() => { this.modalService.open(this.welcome, { centered: true }); }, 3000);
          sessionStorage.setItem('welcome','true');
        }  
      } 

    });
  }

  // getblogdata(){
  //   this.api.getThreeBlog().subscribe(res => {
  //    this.blogdta= res.response.data;
  //   });
  // }

  getSiteData(){
    this.api.getSiteData().subscribe(res => {     
      // console.log(res.response);        
     this.siteData= res.response;

      this.dta_sarvamites=res.response.dta_sarvamites;
      this.dta_customers=res.response.dta_customers;
      this.dta_suppliers=res.response.dta_suppliers;
      this.dta_products=res.response.dta_products;


      

    });
  }



  getAboutHeading(){
    this.api.GetHeadingTextsOne().subscribe(res => {     
      // console.log(res.response);        
     this.aboutHeading= res.response;

    });
  }

  getSupplierHeading(){
    this.api.GetHeadingTextsTwo().subscribe(res => {     
      // console.log(res.response);        
     this.supplierHeading= res.response;

    });
  }


   getEquipemtHeading(){
    this.api.GetHeadingTextsThree().subscribe(res => {     
      // console.log(res.response);        
     this.equipemtHeading= res.response;

    });
  }

  getClientHeading(){
    this.api.GetHeadingTextsFour().subscribe(res => {     
      // console.log(res.response);        
     this.clientHeading= res.response;

    });
  }

  getTestiHeading(){
    this.api.GetHeadingTextsFive().subscribe(res => {     
      // console.log(res.response);        
     this.testiHeading= res.response;

    });
  }

  getBlogHeading(){
    this.api.GetHeadingTextsSix().subscribe(res => {     
      // console.log(res.response);        
     this.blogHeading= res.response;

    });
  }

// ===============================================

  GetAboutMainTexts(){
    this.api.GetAboutMainTexts().subscribe(res => {     
      // console.log(res.response);        
     this.AboutMainTexts= res.response;

    });
  }

  GetAboutFirstTexts(){
    this.api.GetAboutFirstTexts().subscribe(res => {     
      // console.log(res.response);        
     this.AboutFirstTexts= res.response;

    });
  }

  GetAboutSecondTexts(){
    this.api.GetAboutSecondTexts().subscribe(res => {     
      // console.log(res.response);        
     this.AboutSecondTexts= res.response;

    });
  }

  GetWishCartCount(){
      this.api.fetchCartCount().subscribe(res => {     
        // console.log(res.response);        
       this.loginHead.CartCount= res.response.cartcount;
       this.loginHead.wishCount= res.response.wishcount;

      });
    }

  


}
