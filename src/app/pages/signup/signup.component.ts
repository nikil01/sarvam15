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
  selector: 'app-signup',
  standalone: true,  
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule]
})
export class SignupComponent implements OnInit {

	subtn:boolean = true;
	btnerr:string = 'Fill The Form To Register';

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {}

	resolved(captchaResponse: string) {
	    console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	regfrm: FormGroup = new FormGroup({
		name: this.buildr.control(''),
		email: this.buildr.control(''),
		mobile: this.buildr.control(''),
		pass: this.buildr.control(''),
		repass: this.buildr.control(''),
		agree: this.buildr.control('')
	});
	submitted = false;

	ngOnInit(): void {
		this.FetchSEOdata("register");
		this.regfrm = this.buildr.group(
			{
				name: ['', Validators.required],
				mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
				email: ['', [Validators.required, Validators.email]],
				pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
				repass: ['', Validators.required],
				agree: [false, Validators.requiredTrue]
			},
			{
				validators: [Validation.match('pass', 'repass')]
			}
		);
		this.getPageData();
	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});


	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/signin"});
	        this.metaService.updateTag({ name: 'og:type', content: "Customer Sign-in"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
          this.updateSeoTagsService.setCanonical('https://www.sarvamsafety.com/signin');
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Customer Signup / Register");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('signup').subscribe(res => {     
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
		this.api.registeruser(this.regfrm.value).subscribe(res => {			
			// console.log(res.response);
			sessionStorage.setItem("cstid", res.response.cstid);
			sessionStorage.setItem("name", res.response.name);
			sessionStorage.setItem("mobile", res.response.mobile);	
			sessionStorage.setItem("signupotp", res.response.cstid);		
			if(res.response.result == 'Created'){				
				// console.log('registered');
				sessionStorage.setItem("otpattempt", '3');
				this.router.navigate(['/signup-confirm']);
			}else{
				// console.log('dublicate');
				sessionStorage.setItem("otpattempt", '0');
				if(res.response.status == 'Active'){
					this.router.navigate(['/signin']);
				}else{					
					this.router.navigate(['/signup-confirm']);
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

	public showPassword: boolean = false;
	public togglePasswordVisibility(): void {
	    this.showPassword = !this.showPassword;
	  }

	public showCPassword: boolean = false;
	public toggleCPasswordVisibility(): void {
	    this.showCPassword = !this.showCPassword;
	  }



}

