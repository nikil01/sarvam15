import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ApiService } from '../../shared/api.service';
import Validation from '../../core/validation';

import { ToastService } from '../../shared/toast.service';
import { ToastsContainer } from '../../shared/toasts-container.component';
import { Constant } from '../../shared/constant';
import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-pwdreset',
  standalone: true,
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule, ToastsContainer],
  templateUrl: './pwdreset.component.html',
  styleUrls: ['./pwdreset.component.css']
})
export class PwdresetComponent {

		errmsg:string='';
		usrname:any=sessionStorage.getItem('name');
		profileData:any;
		btnerr:string = '';

		sendotpbtn:any;

		filepathabout:string=Constant.API_ENDPOINT+"site/";  
		
  constructor(public toastService: ToastService, private buildr: FormBuilder, private api: ApiService, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {}

		regfrm: FormGroup = new FormGroup({
			otp: this.buildr.control(''),
			pass: this.buildr.control(''),
			repass: this.buildr.control('')			
		});
		submitted = false;

		ngOnInit(): void {
			this.FetchSEOdata("reset-password");
			this.getPageData();
			if(!sessionStorage.getItem("token")){this.router.navigate(['/signin']);}
			this.sendotpbtn="Generate OTP";			

			this.regfrm = this.buildr.group(
				{				
					otp: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.min(100001), Validators.max(999999)]],
					pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
					repass: ['', Validators.required],				
				},
				{
					validators: [Validation.match('pass', 'repass')]
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

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/reset-password"});
	        this.metaService.updateTag({ name: 'og:type', content: "reset-password"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
          this.updateSeoTagsService.setCanonical('https://www.sarvamsafety.com/reset-password');
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Change Password");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }


		pageData:any={};
	    getPageData(){
	      this.api.GetPageDataFacts('reset-password').subscribe(res => {     
	        // console.log(res.response);        
	       this.pageData= res.response;
	         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
	            this.pageBan=this.pageData.pge_banner;           
	         }else{
	            this.getDeafultpgeBan();
	         }
	      });
	    }


		generateOtp(){
			this.sendotpbtn="sending";
			this.api.genrateOtp().subscribe(res => {	
				if(res.response.result=='ok'){
					this.sendotpbtn="OTP Sent";	
				}else{
					this.sendotpbtn="Generate OTP";	
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
			this.updatePassword();
		}

		onReset(): void {
			this.submitted = false;
			this.regfrm.reset();
		}

		updatePassword(){
			// console.log(this.regfrm.value);
			this.api.changepwd(this.regfrm.value).subscribe(res => {		
			console.log(res);					
				if(res.response.result == 'ok'){					
					this.showSuccess('Password Changed Successfully!');
				}else{
					this.showSuccess('Wrong OTP');
					this.btnerr = 'Wrong OTP!';
				}
			});
		}

		showSuccess(msg:any) {
			this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 5000 });
		}


		pageBan:any;
		getDeafultpgeBan(){
			this.api.fetchPageDeafultBan().subscribe(res => {     
			  // console.log(res.response);        
			 this.pageBan= res.response;

			});
		}
		

}
