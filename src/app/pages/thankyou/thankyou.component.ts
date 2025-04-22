import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';

// import { Clipboard } from '@angular/cdk/clipboard';
// import { ClipboardModule } from '@angular/cdk/clipboard';
import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';
import { GlobalService } from '../../shared/global.service';

import { SafeurlPipe } from '../../core/services/safeurl.pipe';
import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-thankyou',
  standalone: true,
   imports: [CommonModule, RouterModule, FormsModule, NgbDatepickerModule, JsonPipe],
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

	paymentStatus:any;
	epid:any;
	evntid:any;
	result:any;
	transid:any;
	paymentData:any;
	eventdta:any;
	filepathblog:string=Constant.API_ENDPOINT+"events/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute, private authService: AuthService, public loginHead: GlobalService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

	ngOnInit(): void {
		this.FetchSEOdata("terms-and-conditions");
		this.getPageData();
		this.checkLogin();
    	this.epid = this.Activatedroute.snapshot.params['epid'];
    	this.evntid = this.Activatedroute.snapshot.params['evntid'];
    	this.result = this.Activatedroute.snapshot.params['result'];
    	this.transid = this.Activatedroute.snapshot.params['transid'];
	    
		
			if(this.epid == ''){this.router.navigate(['/signin'])}else{
			
				
				// this.fetchEventData(this.evntid);
			}
	    
	    if(this.result =="success"){
	    	this.api.sendMailer(this.epid, this.evntid).subscribe((res) => {});
	    }
	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/thankyou"});
	        this.metaService.updateTag({ name: 'og:type', content: "order confirmation"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/thankyou");
	        
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Terms And Conditions");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('thankyou').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	fetchEventData(id:any){
	    this.api.getEventOneSpl(id).subscribe(res => {     
	      	// console.log(res.response);        	     	
	     	this.eventdta= res.response;
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


	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

}
