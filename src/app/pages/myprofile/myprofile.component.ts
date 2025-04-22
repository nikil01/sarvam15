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
  selector: 'app-myprofile',
  standalone: true,
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule, ToastsContainer],
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

		errmsg:string='';
		usrname:any=sessionStorage.getItem('name');
		filepathabout:string=Constant.API_ENDPOINT+"site/";  
		profileData:any;
		
  constructor(public toastService: ToastService, private buildr: FormBuilder, private api: ApiService, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {}

		regfrm: FormGroup = new FormGroup({
			name: this.buildr.control(''),
			email: this.buildr.control(''),
			mobile: this.buildr.control(''),
			company: this.buildr.control('')
		});
		submitted = false;

		ngOnInit(): void {
			this.FetchSEOdata("my-profile");
			this.getPageData();
			if(!sessionStorage.getItem("token")){this.router.navigate(['/signin']);}

			this.getMyProfile();

			this.regfrm = this.buildr.group(
				{				
					name: ['', Validators.required],
					mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
					email: ['', [Validators.required, Validators.email]],
					company: ['']
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


		        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/profile"});
		        this.metaService.updateTag({ name: 'og:type', content: "User Profile"});        
		        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
            this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
            this.updateSeoTagsService.setCanonical('https://www.sarvamsafety.com/profile');
		      }else{
		        // this.router.navigate(['page-not-found']);
		        this.titleService.setTitle("Sarvam Safety Private Limited - My Profile");
				this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
				this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
		      }     
		    });
		   
		  }

		pageData:any={};
	    getPageData(){
	      this.api.GetPageDataFacts('profile').subscribe(res => {     
	        // console.log(res.response);        
	       this.pageData= res.response;
	         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
	            this.pageBan=this.pageData.pge_banner;           
	         }else{
	            this.getDeafultpgeBan();
	         }
	      });
	    }


		getMyProfile(){
			this.api.getMyProfile().subscribe(res => {			
				this.profileData=res.response;
				this.regfrm.patchValue({
					name:this.profileData.cst_name,
					mobile:this.profileData.cst_mobile,
					email:this.profileData.cst_email,
					company:this.profileData.cst_firmid,
				});
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
			this.updateProfile();
		}

		onReset(): void {
			this.submitted = false;
			this.regfrm.reset();
		}

		updateProfile(){
			// console.log(this.regfrm.value);
			this.api.updateProfile(this.regfrm.value).subscribe(res => {							
				if(res.response == 'ok'){				
					this.getMyProfile();
					this.showSuccess('Profile Updated');
				}else{
					this.showSuccess('Something Went Wrong! Try Again.');
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
