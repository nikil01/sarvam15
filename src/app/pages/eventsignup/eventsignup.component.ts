import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ApiService } from '../../shared/api.service';
import Validation from '../../core/validation';
import { GlobalService } from '../../shared/global.service';
import { AuthService } from '../../core/services/auth.service';
import { Constant } from '../../shared/constant';

@Component({
  selector: 'app-eventsignup',
  standalone: true,  
  templateUrl: './eventsignup.component.html',
  styleUrls: ['./eventsignup.component.css'],
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule]
})
export class EventsignupComponent implements OnInit {

	subtn:boolean = true;
	btnerr:string = 'Fill The Form To Register';
	eventData:any={};
	 id:any;
	 profileData:any;
	 filepathabout:string=Constant.API_ENDPOINT+"site/";  

	constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute, public loginHead: GlobalService, private authService: AuthService) {}

	resolved(captchaResponse: string) {
	    console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	regfrm: FormGroup = new FormGroup({
		name: this.buildr.control(''),
		email: this.buildr.control(''),
		mobile: this.buildr.control(''),
		company: this.buildr.control(''),	
		
	});
	submitted = false;

	ngOnInit(): void {
		this.getPageData();

		if(!sessionStorage.getItem("token")){
			sessionStorage.setItem('backlink', this.router.url);
			this.router.navigate(['/signin']);
		}else{
			this.checkLogin();
		}
		


		this.Activatedroute.queryParamMap.subscribe((queryParams) => {
			this.id = this.Activatedroute.snapshot.params['evntid'];	
			if(this.id == ''){this.router.navigate(['/events'])}else{
				// console.log(this.id);
				this.getEventdataOne(this.id);	
				this.getMyProfile();
			}
					
		});



		this.regfrm = this.buildr.group(
			{
				fname: ['', Validators.required],
				lname: ['', Validators.required],
				mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
				email: ['', [Validators.required, Validators.email]],
				job: ['', Validators.required],
				company: ['', Validators.required],
				howdid: ['Whatsapp', Validators.required],
				expected: ['', Validators.required],							
				
			}
		);
	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('eventsignup').subscribe(res => {     
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
				const nameslipt = this.profileData.cst_name.split(" ");
				this.regfrm.patchValue({
					fname:nameslipt[0],
					lname:nameslipt[1],
					mobile:this.profileData.cst_mobile,
					email:this.profileData.cst_email,
					company:this.profileData.cst_firmid,
				});
			});
		}


	checkLogin(){
		this.api.loginCheck().subscribe(res => {   
			let isauth = res.success;  
			if(isauth){
	          // console.warn('true res',res.success);
	          // this.router.navigate(['/']);
	          this.loginHead.showbutton=true;
	          this.loginHead.usrname=sessionStorage.getItem('name');
	        }else{
	        	this.authService.logout();
		        sessionStorage.clear();
		        this.loginHead.showbutton=false;
		        this.router.navigate(['/signin']);   
	        }
	    });	
	}

	 getEventdataOne(id:any){
	    this.api.getEventOne(id).subscribe(res => {     
	      // console.log(res.response);        
	     this.eventData= res.response;
	     

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
		this.api.regparticipant(this.regfrm.value, this.id).subscribe(res => {			
			console.log(res.response);			
			sessionStorage.setItem("participantname", res.response.name);
			sessionStorage.setItem("participantmobile", res.response.mobile);
			if(res.response.result == 'Created'){				
				// console.log('registered');
				if(res.response.apitopay == 'Free'){
					this.router.navigate(['/eventpayment/',res.response.epid,this.id]);
				}else{
					sessionStorage.setItem("participantid", res.response.epid);	
					this.btnerr="Registered Successfuly, Will be redirected To Payment Page.";
					
					const encpadta = res.response.apitopay;					
					const eurl = "https://paypg.icicibank.com/payment-capture/?"+encpadta;
					window.location.href = eurl;
					// setTimeout(() => { window.location.href = eurl; }, 2000);
				}
			}else{
				console.log('Duplicate');
				this.btnerr="Oops! something went wrong! try again later.";
				sessionStorage.removeItem("participantid");
				setTimeout(() => { this.router.navigate(['/events']); }, 3000);
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

