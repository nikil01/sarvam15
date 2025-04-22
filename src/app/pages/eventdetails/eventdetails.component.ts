import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';


import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { SafeurlPipe } from '../../core/services/safeurl.pipe';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

export class List {
  skp : number=0;
  lmt : number=0;
  searchKey : string = '';  
  sdate : any;
  edate : any;
}

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgbDatepickerModule, JsonPipe],
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit{

	filepathblog:string=Constant.API_ENDPOINT+"events/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  
    eventData:any={};
    eventList:any;
    id:any;
    
    hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;

  constructor(private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
    	this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}



	reloadevents(id:any,link:any){
		this.router.navigate(['/event/',id,link]);

		this.getEventdataOne(id);	

		this.getThreeEvent();

	}


    ngOnInit() {
	  this.getThreeEvent();
	  this.getPageData();



	    this.Activatedroute.queryParamMap.subscribe((queryParams) => {
			// this.id = this.Activatedroute.snapshot.queryParamMap.get('id') || '';	
			this.id = this.Activatedroute.snapshot.params['evntid'];
			if(this.id == ''){this.router.navigate(['/events'])}else{
				// console.log(this.id);
				this.FetchSEOdata(this.id);
				this.getEventdataOne(this.id);	
			}
					
		});

	    
	  }

	FetchSEOdata(url:any){
		this.api.fetchSeoData(url).subscribe((res) => {
			// console.log(res.response);
			if(res.success){
				
				this.titleService.setTitle(res.response.seo_title);
				this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
				this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

				this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/event/"+this.id+"/"+res.response.seo_title});
	            this.metaService.updateTag({ name: 'og:type', content: "Webinar"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
        this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/event/" + this.id + "/" + res.response.seo_title);
	            
			}else{
				// this.router.navigate(['page-not-found']);
			}			
		});
		
	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('event').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	  getThreeEvent(){
	    this.api.getThreeEvent().subscribe(res => {     
	      // console.log(res.response);        
	     this.eventList= res.response.data;

	    });
	  }

	  getEventdataOne(id:any){
	    this.api.getEventOne(id).subscribe(res => {     
	      // console.log(res.response);        
	     this.eventData= res.response;
	     this.metaService.updateTag({ name: 'og:image', content: Constant.API_ENDPOINT+"events/"+res.response.evt_photo});
	     // this.pageData.seo_permalink = this.eventData.evt_heading.replace(" ", "-");
	    });
	  }

	  searchtag="";
	    searchFor(){
	      this.router.navigate(['/events'], { queryParams: { saechkey: [this.searchtag]}});
	    }


	    pageBan:any;
		getDeafultpgeBan(){
			this.api.fetchPageDeafultBan().subscribe(res => {     
			  // console.log(res.response);        
			 this.pageBan= res.response;

			});
		}

}
