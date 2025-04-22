import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ApiService } from '../../shared/api.service';
import Validation from '../../core/validation';
import { GlobalService } from '../../shared/global.service';
import { Constant } from '../../shared/constant';
import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';
@Component({
  selector: 'app-trackorder',
  standalone: true,
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.css']
})
export class TrackorderComponent implements OnInit{


	subtn:boolean = true;
	btnerr:string = '';
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, public loginHead: GlobalService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {}

	

	regfrm: FormGroup = new FormGroup({
		trackingid: this.buildr.control(''),		
	});
	submitted = false;

	ngOnInit(): void {	
		this.FetchSEOdata("track-order");
		this.getPageData();
		this.regfrm = this.buildr.group(
			{
				trackingid: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
			}
		);		
	}


	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/track-order"});
	        this.metaService.updateTag({ name: 'og:type', content: "Order Tracker"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
          this.updateSeoTagsService.setCanonical('https://www.sarvamsafety.com/track-order');
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Track Order Status");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('track-order').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	get f(): { [key: string]: AbstractControl } {
		return this.regfrm.controls;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.regfrm.invalid) {
			return;
		}

		// console.log(JSON.stringify(this.regfrm.value, null, 2));
		this.signup();

	}

	  onReset(): void {
	    this.submitted = false;
	    this.regfrm.reset();
	  }

	trckid:any;
	trchmsg:string="Enter Order Tracking Number";
	screenstatus:boolean=false;

	signup(){
		// console.log(this.regfrm.value);	
		
		this.api.getorderstatus(this.regfrm.value).subscribe(res => {		
			// console.log(res);
			if(res.success){
				// console.log('registered');
				this.trchmsg="Order Tracking ID "+res.response.trackid;	
				this.screenstatus = true;
				this.trckid	= res.response.message;
			}else{
				this.btnerr="Invalid Tracking ID!";
			}
		});

		
	}

	resetform(){
		this.screenstatus = false;
		this.trchmsg ="Enter Order Tracking Number";
	}

	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

}
