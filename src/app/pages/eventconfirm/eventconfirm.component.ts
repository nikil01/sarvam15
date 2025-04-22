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
  selector: 'app-eventconfirm',
  standalone: true,  
  templateUrl: './eventconfirm.component.html',
  styleUrls: ['./eventconfirm.component.css'],
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule]
})
export class EventconfirmComponent implements OnInit {


	subtn:boolean = true;
	btnerr:string = '';

	cst_name:string ='';
	cst_mobile:string ='';
	cst_id:string ='';

	attempt:number = Number(sessionStorage.getItem("otpregatmpt"));
	otpvisible:boolean = true;

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, public loginHead: GlobalService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {


	}

	

	regfrm: FormGroup = new FormGroup({
		otp: this.buildr.control(''),		
	});
	submitted = false;

	ngOnInit() {
		this.FetchSEOdata("event-confirm");
		this.getPageData();

		if(!sessionStorage.getItem("participantid")){this.router.navigate(['/eventsignup']);}

		this.regfrm = this.buildr.group(
			{
				otp: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.min(100001), Validators.max(999999)]]
			}
		);

		this.cst_id=sessionStorage.getItem("participantid");
		this.cst_name=sessionStorage.getItem("participantname");
		this.cst_mobile=sessionStorage.getItem("participantmobile");

		
	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/events"});
	            this.metaService.updateTag({ name: 'og:type', content: "Webinar"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	            this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/events");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Webinar Registration Confirmation");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('eventregconfirm').subscribe(res => {     
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



	signup(){
		// console.log(this.regfrm.value);
		this.attempt=this.attempt-1;
		sessionStorage.setItem("otpregatmpt", this.attempt.toString());
		this.api.regEevntConfirm(this.regfrm.value, this.attempt).subscribe(res => {		
			// console.log(res);
			if(res.success){
				// console.log('registered');
				this.btnerr="Registered Successfuly, Will be redirected To Payment Page.";
				// sessionStorage.setItem("token", res.response.token);
				// sessionStorage.removeItem("participantid");		
				// const eurl = res.response.apitopay;
				if(res.response.result == 'ok'){
					const encpadta = res.response.apitopay;					
						const eurl = "https://payuatrbac.icicibank.com/payment-capture/?"+encpadta;
						setTimeout(() => { window.location.href = eurl; }, 3000);					
				}else{

				}


				// setTimeout(() => { window.location.href = eurl; }, 3000);
				// setTimeout(() => { this.router.navigate(['/eventpayment']); }, 3000);				
			}else{
				// console.log('dublicate');
				if(this.attempt <= 0){
					this.btnerr="Oops! Account Blocked Due to wrong OTP! Redirecting Back";
					this.otpvisible=false; 
					sessionStorage.removeItem("participantid");
					setTimeout(() => { this.router.navigate(['/events']); }, 3000);
				}else{
					this.btnerr="Oops! wrong OTP Try Agin : "+this.attempt+" More Attempt Left";
				}




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


}

