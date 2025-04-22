import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';
import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-paymentmethods',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paymentmethods.component.html',
  styleUrls: ['./paymentmethods.component.css']
})
export class PaymentmethodsComponent implements OnInit{
	tncdata:any={};
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private api: ApiService, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

	ngOnInit(): void {
		this.FetchSEOdata("payment-methods");
		this.getTnCData();		
		this.getPageData();
	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/payment-methods"});
	        this.metaService.updateTag({ name: 'og:type', content: "payment methods"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/Payment methods.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/payment-methods");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Payment Methods");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	getTnCData(){
		this.api.getPayMethodsData().subscribe(res => {			
			this.tncdata=res.response;				
		});
	}
	
	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('payment-methods').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }
}
