import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ClipboardModule } from 'ngx-clipboard';
import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { SafeurlPipe } from '../../core/services/safeurl.pipe';

@Component({
  selector: 'app-eventpayment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgbDatepickerModule, JsonPipe, ClipboardModule, NgbTooltipModule],
  templateUrl: './eventpayment.component.html',
  styleUrls: ['./eventpayment.component.css']
})
export class EventpaymentComponent implements OnInit {


	paymentStatus:any;
	epid:any;
	evntid:any;
	paymentData:any={};
	eventdta:any ={};
	filepathblog:string=Constant.API_ENDPOINT+"events/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

	constructor(private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute) {
    	
    }

    ngOnInit(): void {
    	this.getPageData();
    	this.epid = this.Activatedroute.snapshot.params['epid'];
    	this.evntid = this.Activatedroute.snapshot.params['evntid'];
	    
		
			if(this.epid == ''){this.router.navigate(['/events'])}else{
			
				this.getEventdataOne(this.epid);	
				this.fetchEventData(this.evntid);
			}
	    
	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('eventpayment').subscribe(res => {     
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

	getEventdataOne(epid:any){
	    this.api.getPaymentStatus(epid).subscribe(res => {     
	      	// console.log(res.response);        
	     	this.paymentStatus= res.response.prt_transnum;
	     	this.paymentData= res.response;	     	
	    });
	}

	// ========== copy ro clipboard================
	// public copyToClip(value: any): void {
		// this.clipboard.copy(value);	  		
		// console.log(value);
		// const successful = this.clipboard.copy(text);
	// }
	// ========== copy ro clipboard================


	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

}
