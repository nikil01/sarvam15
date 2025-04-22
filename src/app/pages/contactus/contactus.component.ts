import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import Validation from '../../core/validation';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';
import { SafeurlPipe } from '../../core/services/safeurl.pipe';

import {Title, Meta} from '@angular/platform-browser';

import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, SafeurlPipe, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})

export class ContactusComponent {
	filepathblog:string=Constant.API_ENDPOINT+"site/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  
	siteData:any={};
	OfficeData:any={};
	BranchData:any;

	subtn:boolean = true;
	btnerr:string = '';

	showForm:boolean = true;

	errormsg:boolean = false;	
	successmsg:boolean = false;

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

	resolved(captchaResponse: string) {
	    console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	contForm: FormGroup = new FormGroup({
		name: this.buildr.control(''),
		email: this.buildr.control(''),
		mobile: this.buildr.control(''),
		company: this.buildr.control(''),
		subject: this.buildr.control(''),
		message: this.buildr.control('')
	});
	submitted = false;

	ngOnInit() {
		this.FetchSEOdata("contact-us");
	    AOS.init({disable: 'mobile'});
	    AOS.refresh();

	    if(sessionStorage.getItem("feedbacksent")){
	    	this.showForm = false;
	    }

	    this.contForm = this.buildr.group(
			{
				name: ['', Validators.required],	
				company: ['', Validators.required],			
				mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
				email: ['', [Validators.required, Validators.email]],
				subject: ['', Validators.required],
				message: ['', [Validators.required, Validators.maxLength(250)]]
			}
		);

	    this.getSiteData();
	    this.getHeadOfficeData();
	    this.getBranchOfficeData();
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

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/contact"});
	            this.metaService.updateTag({ name: 'og:type', content: "contact us"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	            this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/Contact us.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/contact");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Contact Details");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }


	getSiteData(){
	    this.api.getSiteData().subscribe(res => {     
	      // console.log(res.response);        
	     this.siteData= res.response;

	    });
	  }

	  getHeadOfficeData(){
	    this.api.getOfficeDataOne().subscribe(res => {     
	      // console.log(res.response);        
	     this.OfficeData= res.response;

	    });
	  }

	  getBranchOfficeData(){
	    this.api.getOfficeDataBranch().subscribe(res => {     
	      // console.log(res.response);        
	     this.BranchData= res.response.data;

	    });
	  }





	get f(): { [key: string]: AbstractControl } {
		return this.contForm.controls;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.contForm.invalid) {
			return;
		}

		// console.log(JSON.stringify(this.regfrm.value, null, 2));
		this.sendFeedback();

	}

	  onReset(): void {
	    this.submitted = false;
	    this.contForm.reset();
	  }



	sendFeedback(){
		// console.log(this.regfrm.value);
		this.api.sendFeedback(this.contForm.value).subscribe(res => {			
			console.log(res.response.data);			
			if(res.response.result == 'Created'){				
				// console.log(res.response.data);
				this.showForm = false;
				this.successmsg = true;
				sessionStorage.setItem("feedbacksent", 'yes');				
			}else{
				// console.log('dublicate');	
				this.errormsg = true;	
				this.showForm = true;		
			}

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
      this.api.GetPageDataFacts('contact').subscribe(res => {     
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
