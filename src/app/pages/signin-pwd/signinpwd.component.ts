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
@Component({
  selector: 'app-signinpwd',
  standalone: true,  
  templateUrl: './signinpwd.component.html',
  styleUrls: ['./signinpwd.component.css'],
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule]
})
export class SigninpwdComponent implements OnInit {

	subtn:boolean = true;
	btnerr:string = '';

	cst_name:string ='';
	cst_mobile:string ='';
	cst_id:string ='';

	attempt:number = Number(sessionStorage.getItem("signinpwdattempt"));
	otpvisible:boolean = true;

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

	constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, public loginHead: GlobalService, private metaService: Meta, private titleService: Title) {}

	

	regfrm: FormGroup = new FormGroup({
		pwd: this.buildr.control(''),		
	});
	submitted = false;

	ngOnInit(): void {
		this.FetchSEOdata("album");
		this.getPageData();
		if(!sessionStorage.getItem("signinpwd")){this.router.navigate(['/signin']);}


		this.regfrm = this.buildr.group(
			{
				pwd: ['', Validators.required]
			}
		);

		this.cst_id=sessionStorage.getItem("cstid");
		this.cst_name=sessionStorage.getItem("name");
		this.cst_mobile=sessionStorage.getItem("mobile");

		if(this.attempt <= 0){this.otpvisible=false;}
	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle("Sarvam Safety - "+res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Signin with Password");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('signin-pass').subscribe(res => {     
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

	public showPassword: boolean = false;
	public togglePasswordVisibility(): void {
	    this.showPassword = !this.showPassword;
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

	  changeUid(){
	  	sessionStorage.removeItem("signinpwd");
	  	sessionStorage.removeItem("cstid");
		sessionStorage.removeItem("name");
		sessionStorage.removeItem("mobile");
		sessionStorage.removeItem("signinpwdattempt");
	  	this.router.navigate(['/signin']);
	  }

	signup(){
		// console.log(this.regfrm.value);
		this.attempt=this.attempt-1;
		sessionStorage.setItem("signinpwdattempt", this.attempt.toString());
		this.api.pwdsignin(this.regfrm.value, this.attempt).subscribe(res => {
			// this.closepopup();
			// console.log(res);
			if(res.success){
				// console.log('registered');
				this.btnerr="Logged-in Successfuly!";
				sessionStorage.setItem("token", res.response.token);
				this.loginHead.showbutton=true;
				this.loginHead.usrname=sessionStorage.getItem('name');
				sessionStorage.removeItem("signinpwd");
				if(sessionStorage.getItem('backlink')){
					const gobackpage= sessionStorage.getItem('backlink');				
					if((gobackpage != "/signup") && (gobackpage != "/signin")){
						this.router.navigate([gobackpage]);
						// setTimeout(() => { this.router.navigate([gobackpage]); }, 3000);
					}else{
						this.router.navigate(['/home']);
						// setTimeout(() => { this.router.navigate(['/home']); }, 3000);
					}	
				}else{
					this.router.navigate(['/home']);
				}
						
			}else{
				// console.log('dublicate');
				if(this.attempt <= 0){
					this.btnerr="Oops! Account Blocked Due to wrong Password!";
					this.otpvisible=false;
					sessionStorage.removeItem("signinpwd");
					const gobackpage= sessionStorage.getItem('backlink');				
					if((gobackpage != "/signup") && (gobackpage != "/signin")){
						setTimeout(() => { this.router.navigate([gobackpage]); }, 3000);
					}else{
						setTimeout(() => { this.router.navigate(['/home']); }, 3000);
					}

				}else{
					this.btnerr="Oops! wrong Password Try Agin : "+this.attempt+" More Attempt Left";
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

