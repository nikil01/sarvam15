import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import Validation from '../../core/validation';

import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-applyforjob',
  standalone: true,
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgbAlertModule, JsonPipe],
  templateUrl: './applyforjob.component.html',
  styleUrls: ['./applyforjob.component.css']
})
export class ApplyforjobComponent implements OnInit{
	visibleform:boolean=true;
	visibledub:boolean=true;

	jobData:any={};
	jobid:any;

	filepathabout:string=Constant.API_ENDPOINT+"site/";  
	
	subtn:boolean = true;
	btnerr:string = 'Fill The Form To Register';

	model: NgbDateStruct;

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

	resolved(captchaResponse: string) {
	    console.log(`Resolved captcha with response: ${captchaResponse}`);
	}


// job_id, job_jobid, job_photo, job_jd, job_education, job_skills, job_experience, job_pin, job_mobile, job_email, job_linkedin, job_facebook, job_resume, job_status, job_createdAt, job_updatedAt
	regfrm: FormGroup = new FormGroup({
		jobid: this.buildr.control(''),
		name: this.buildr.control(''),
		email: this.buildr.control(''),
		mobile: this.buildr.control(''),
		education: this.buildr.control(''),
		skills: this.buildr.control(''),
		experience: this.buildr.control(''),
		pin: this.buildr.control('600049'),
		linkedin: this.buildr.control(''),
		dob: this.buildr.control(''),
		photo: this.buildr.control(''),
		resume: this.buildr.control(''),		
	});
	submitted = false;

	ngOnInit(): void {
		this.getPageData();

		this.Activatedroute.queryParamMap.subscribe((queryParams) => {
			this.jobid = this.Activatedroute.snapshot.queryParamMap.get('id') || '';                 
		});		

		if(this.jobid != ''){
			this.getJobDetails(this.jobid);
			this.FetchSEOdata(this.jobid);
		}else{
			this.router.navigate(['/career']);
		}
		
		this.regfrm = this.buildr.group(
			{
				jobid: [this.jobid, Validators.required],
				name: ['', Validators.required],
				mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
				email: ['', [Validators.required, Validators.email]],			
				education: ['', Validators.required],
				skills: ['', Validators.required],
				experience: [''],
				pin: [600049],
				linkedin: [''],				
				dob: ['', Validators.required],
				photo: ['', Validators.required],
				resume: ['', Validators.required]			
			}
		);
		
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
      this.api.GetPageDataFacts('job-apply').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	getJobDetails(jid:any){
		this.api.getJobDetail(jid).subscribe((res) => {
			// console.log(res.response);
	      this.jobData = res.response;
	  	})		
	}

	FetchSEOdata(url:any){
		this.api.fetchSeoData(url).subscribe((res) => {
			// console.log(res.response);
			if(res.success){				
				this.titleService.setTitle("Sarvam Safety Career - "+res.response.seo_title);
				this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
				this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

				this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/career"});
	          this.metaService.updateTag({ name: 'og:type', content: "career"});        
	          this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
        this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
        this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/career");
			}else{
				// this.router.navigate(['page-not-found']);
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
		this.api.applyForJob(this.regfrm.value, this.image, this.pdf).subscribe(res => {			
			// console.log(res.response);								
			if(res.response.result == 'ok'){
				this.visibleform = false;
			}else{				
				this.visibledub = false;
				this.visibleform = false;
			}
		});
	}


	// file to upload --------------
	image!:File;	
	photoToUpload($event:any){		
		const pphpoto = $event.target.files[0];
		// this.regfrm.patchValue({
		// 	photo: pphpoto
		// });
		this.image=pphpoto;
		// this.regfrm.updateValueAndValidity();		
	}

	// file to upload --------------
	pdf!:File;	
	resumeToUpload($event:any){		
		const cvfile = $event.target.files[0];
		// this.regfrm.patchValue({
		// 	resume: cvfile
		// });
		this.pdf=cvfile;
		// this.regfrm.updateValueAndValidity();		
	}


}
