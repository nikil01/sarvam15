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

import { TrainingslidersComponent } from '../../shared/partials/trainingsliders/trainingsliders.component';
import { TrainingtestimonialsComponent } from '../../shared/partials/trainingtestimonials/trainingtestimonials.component';
import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, RouterModule, RecaptchaModule, RecaptchaFormsModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgbAlertModule, JsonPipe, TrainingslidersComponent, TrainingtestimonialsComponent],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit{
	testiHeading:any={};
	trainigtopics:any;

	visibleform:boolean=true;
	visibledub:boolean=true;

	subtn:boolean = true;
	btnerr:string = 'Fill The Form To Register';

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

	TrainingFirstTexts:any={};

	model: NgbDateStruct;

  constructor(private buildr: FormBuilder, private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

	resolved(captchaResponse: string) {
	    console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	regfrm: FormGroup = new FormGroup({		
		name: this.buildr.control(''),
		email: this.buildr.control(''),
		mobile: this.buildr.control(''),
		company: this.buildr.control(''),
		location: this.buildr.control(''),
		topics: this.buildr.control(''),		
		remarks: this.buildr.control('')			
	});
	submitted = false;



	ngOnInit(): void {
		this.FetchSEOdata("training");
		this.getPageData();
		this.getTrainingData('all');
		this.getTestiHeading();
		this.GetTrainingFirstText();

		this.regfrm = this.buildr.group(
			{				
				name: ['', Validators.required],
				mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
				email: ['', [Validators.required, Validators.email]],			
				company: ['', Validators.required],
				location: ['', Validators.required],
				topics: ['Select Recommended Topics', Validators.required],				
				remarks: ['']					
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

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/training"});
	        this.metaService.updateTag({ name: 'og:type', content: "training"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/training");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Safety Training Courses");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('training').subscribe(res => {     
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
		this.api.applyForTraining(this.regfrm.value).subscribe(res => {			
			// console.log(res.response);								
			if(res.response.result == 'ok'){
				this.visibleform = false;
			}else{				
				this.visibledub = false;
				this.visibleform = false;
			}
		});
	}


	getTrainingData(id:any){
	    this.api.getTrainingTopics(id).subscribe(res => {     
	      // console.log(res.response);        
	     this.trainigtopics= res.response.data;

	    });
  }

  getTestiHeading(){
    this.api.GetHeadingTextsEight().subscribe(res => {     
      // console.log(res.response);        
     this.testiHeading= res.response;

    });
  }


  GetTrainingFirstText(){
    this.api.GetTrainingFirstText().subscribe(res => {     
      // console.log(res.response);        
     this.TrainingFirstTexts= res.response;

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
