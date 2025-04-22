import { Component, NgModule, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { SlidertestimonialsComponent } from '../../shared/partials/slidertestimonials/slidertestimonials.component';
import { SliderteamComponent } from '../../shared/partials/sliderteam/sliderteam.component';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import AOS from 'aos';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, SlidertestimonialsComponent, SliderteamComponent, RouterModule],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutusComponent implements OnInit {

    AboutMainTexts:any={};
    AboutFirstTexts:any={};
    AboutSecondTexts:any={};
    filepathabout:string=Constant.API_ENDPOINT+"site/";    
    teamHeading:any={};

    url:any;

  constructor(private router: Router, private api: ApiService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService ) { }

	  ngOnInit() {
      this.url = this.router.url.replace("/", "");
    // console.log(this.url);
    this.FetchSEOdata('about-us');


	    AOS.init({disable: 'mobile', once:true});
	    AOS.refresh();

      this.GetAboutMainTexts();
      this.GetAboutFirstTexts();
      this.GetAboutSecondTexts();
      this.getTeamHeading();
      // this.getDeafultpgeBan();
      this.getPageData();
	  }

    FetchSEOdata(url:any){
      this.api.fetchSeoData(url).subscribe((res) => {
        // console.log(res.response);
        if(res.success){
         
          this.titleService.setTitle(res.response.seo_title);
          this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
          this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

          this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/about"});
          this.metaService.updateTag({ name: 'og:type', content: "About Us"});        
          this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/ABOUT US.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/about");
        }else{
          // this.router.navigate(['page-not-found']);
        }     
      });
     
    }

    pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('about').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

  GetAboutMainTexts(){
    this.api.GetAboutUsMainTexts().subscribe(res => {     
      // console.log(res.response);        
     this.AboutMainTexts= res.response;

    });
  }

  GetAboutFirstTexts(){
    this.api.GetAboutUsMission().subscribe(res => {     
      // console.log(res.response);        
     this.AboutFirstTexts= res.response;

    });
  }

  GetAboutSecondTexts(){
    this.api.GetAboutUsVission().subscribe(res => {     
      // console.log(res.response);        
     this.AboutSecondTexts= res.response;

    });
  }

   getTeamHeading(){
    this.api.GetHeadingTextsSeven().subscribe(res => {     
      // console.log(res.response);        
     this.teamHeading= res.response;

    });
  }

  pageBan:any;
  getDeafultpgeBan(){
    this.api.fetchPageDeafultBan().subscribe(res => {     
      // console.log(res.response);        
     this.pageBan= res.response;

    });
  }

}
