import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ApiService } from '../../shared/api.service';
import Validation from '../../core/validation';
import { Constant } from '../../shared/constant';
import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	errmsg:string='';

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {}


	resolved(captchaResponse: string) {
	    console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	regfrm: FormGroup = new FormGroup({
		uid: this.buildr.control('')		
	});
	submitted = false;

	ngOnInit(): void {
		this.FetchSEOdata("login");
		this.getPageData();
		this.regfrm = this.buildr.group(
			{				
				uid: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]]
			}
		);

		if(sessionStorage.getItem('cstid')){
			this.errmsg = '<p>Welcome '+sessionStorage.getItem('name')+ ',</p>';
			this.errmsg += '<p>You are already registered with Sarvam, Continue with Login</p>';

			this.regfrm.patchValue({
				uid:sessionStorage.getItem('mobile')
			});
		}

		

	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/signup"});
	        this.metaService.updateTag({ name: 'og:type', content: "Customer Sign-up"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description })
          this.updateSeoTagsService.setCanonical('https://www.sarvamsafety.com/signup');
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Customer Signin");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('signin').subscribe(res => {     
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
		// this.signin();

	}

	  onReset(): void {
	    this.submitted = false;
	    this.regfrm.reset();
	  }



	// signin(){
	// 	// console.log(this.regfrm.value);
	// 	this.api.registeruser(this.regfrm.value).subscribe(res => {			
	// 		// console.log(res.response);
	// 		sessionStorage.setItem("cstid", res.response.cstid);
	// 		sessionStorage.setItem("name", res.response.name);
	// 		sessionStorage.setItem("mobile", res.response.mobile);			
	// 		if(res.response.result == 'Created'){				
	// 			// console.log('registered');
	// 			sessionStorage.setItem("otpattempt", '3');
	// 			this.router.navigate(['/signup-confirm']);
	// 		}else{
	// 			// console.log('dublicate');
	// 			sessionStorage.setItem("otpattempt", '0');
	// 			if(res.response.status == 'Active'){
	// 				this.router.navigate(['/signin']);
	// 			}else{					
	// 				this.router.navigate(['/signup-confirm']);
	// 			}
	// 		}

	// 	});
	// }


	padpge(){
		this.api.signinpassword(this.regfrm.value).subscribe(res => {			
			// console.log(res.response);
				
			if(res.response.result == 'Ok'){				
				sessionStorage.setItem("cstid", res.response.cstid);
				sessionStorage.setItem("name", res.response.name);
				sessionStorage.setItem("mobile", res.response.mobile);	
				sessionStorage.setItem("signinpwd", res.response.cstid);		
				// console.log('registered');
				sessionStorage.setItem("signinpwdattempt", '3');
				this.router.navigate(['/signin-pass']);
			}else{
				// console.log('dublicate');
				this.errmsg = res.response.message;
			}

		});
	}

	genotp(){
		this.api.signinotp(this.regfrm.value).subscribe(res => {			
			// console.log(res.response);
					
			if(res.response.result == 'Ok'){				
				// console.log('registered');
				sessionStorage.setItem("cstid", res.response.cstid);
				sessionStorage.setItem("name", res.response.name);
				sessionStorage.setItem("mobile", res.response.mobile);	
				sessionStorage.setItem("signinotp", res.response.cstid);
				sessionStorage.setItem("signinotpattempt", '3');
				this.router.navigate(['/signin-otp']);
			}else{
				// console.log('dublicate');
				this.errmsg = res.response.message;
			}

		});
	}

	resetpwd(){
		this.api.signinotp(this.regfrm.value).subscribe(res => {			
			// console.log(res.response);
					
			if(res.response.result == 'Ok'){				
				// console.log('registered');
				sessionStorage.setItem("cstid", res.response.cstid);
				sessionStorage.setItem("name", res.response.name);
				sessionStorage.setItem("mobile", res.response.mobile);	
				sessionStorage.setItem("signinotp", res.response.cstid);
				sessionStorage.setItem("signinotpattempt", '3');
				this.router.navigate(['/change-password']);
			}else{
				// console.log('dublicate');
				this.errmsg = res.response.message;
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
