import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { SafeurlPipe } from '../../core/services/safeurl.pipe';

import {Title, Meta} from '@angular/platform-browser';

import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

export class List {
  skp : number=0;
  lmt : number=0;
  searchKey : string = '';  
  sdate : any;
  edate : any;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [],
})
export class EventsComponent {

	filepathblog:string=Constant.API_ENDPOINT+"events/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  
    eventData:any;
    eventList:any;

    isvalbl:number=0;

    hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;

  constructor(private api: ApiService, private router: Router, private Activatedroute: ActivatedRoute, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
    	this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 60);
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



	  listObj:List = new List();
	  // ==================== pagination vars
	  currentPage:number = 1;
	  totalPage:number = 0;
	  pagesArray:any;
	  totalCount:number = 0;
	  recordFetch:number = 0;
	  recordCount:number = 0;
	  rowPerPage:number = 10;
	  skipRecord:number = 0;
	  recordStart:number = 0;
	  btnNext:boolean = true;
	  btnPrevious:boolean = false;
	  visiblePages:number = 0;
	  // ==================== pagination vars


	  getEventdata(p:any){
	  	this.listObj.sdate = this.fromDate.year +'-'+this.fromDate.month+'-'+this.fromDate.day;
	  	this.listObj.edate = this.toDate.year +'-'+this.toDate.month+'-'+this.toDate.day;
	    // console.log(this.listObj);

	    if(p=='n'){
	      this.listObj.skp=this.listObj.skp+this.rowPerPage;
	      this.currentPage=this.currentPage+1;
	    }else if(p=='p'){
	      this.listObj.skp=this.listObj.skp-this.rowPerPage;
	      this.currentPage=this.currentPage-1;
	    }else if(p >= 1){
	      this.listObj.skp=(p*this.rowPerPage)-this.rowPerPage;
	      this.currentPage=p;
	    }else{
	      this.listObj.skp=0;
	      this.currentPage=1;
	    }

	    this.listObj.lmt=this.rowPerPage;
	    

	    this.api.getEventList(this.listObj).subscribe((res) => {
	      this.eventData = res.response.data;
	      
	      this.isvalbl = res.response.data.length;
	      // console.log(res.response.data);
	      this.recordFetch = res.response.recordCount;
	      this.totalCount=res.response.totalCount;
	      if(this.totalCount == 0){}else{ 

	      this.totalPage = Math.ceil(res.response.totalCount/this.rowPerPage);

	      this.visiblePages=8;
	      let caro = Math.ceil(this.visiblePages/2);
	      let taro = Math.floor(this.visiblePages/2);
	      let baro = 0;
	      if(caro < taro){baro = (caro*2);}else{baro = (taro*2);}
	      let isOddNum = this.visiblePages % 2;
	      if(isOddNum == 0){baro = baro-1;}

	      if(this.totalPage <= this.visiblePages){
	        this.pagesArray = Array.from(Array(this.totalPage).keys()).map(x => x + 1);
	      }else if(this.currentPage <= caro){
	        this.pagesArray = Array.from(Array(this.totalPage -(this.totalPage - this.visiblePages)).keys()).map(x => x + 1);
	      }else if(this.totalPage >= (this.visiblePages+1) && this.currentPage <= (this.totalPage-caro)){
	        this.pagesArray =  Array.from(Array(this.visiblePages).keys()).map(x => x + (this.currentPage -caro)+1);
	      }else if(this.currentPage >= (this.totalPage-caro)){
	        this.pagesArray =  Array.from(Array(this.visiblePages).keys()).map(x => x+(this.totalPage-baro));
	      }

	      this.recordStart=this.listObj.skp+1;

	      if(this.listObj.skp <= this.totalCount - this.rowPerPage ){
	        this.recordCount = this.recordFetch;
	        this.recordStart = 1;
	        this.btnNext = false;
	      }else{this.btnNext = true;}

	      if(this.rowPerPage >= this.totalCount){
	        this.btnNext = true;
	      }

	      if(this.listObj.skp >= this.listObj.lmt){
	        this.recordCount = this.listObj.skp+this.recordFetch;
	        this.recordStart = this.listObj.skp+1;
	        this.btnPrevious = false;
	      }else{this.btnPrevious = true;}

	      if(this.rowPerPage >= this.totalCount){
	        this.recordCount = this.totalCount;
	        this.recordStart = 1;
	      }

	      this.skipRecord = this.rowPerPage+this.recordCount;

	      // this.dataSource =res.response.data;
	      // this.dataCard = res.response.data;
	      // this.isLoadingResults = false;
	    }
	    })
	  }


	ngOnInit() {
		this.FetchSEOdata("webinar");
	    AOS.init({disable: 'mobile', once:true});
	    AOS.refresh();
	    this.getPageData();

	    this.Activatedroute.queryParamMap.subscribe((queryParams) => {
	        this.listObj.searchKey = this.Activatedroute.snapshot.queryParamMap.get('saechkey') || '';                 
	      });

	      // this.getbloglist();
	      this.getEventdata(1);
	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/events"});
	        this.metaService.updateTag({ name: 'og:type', content: "events"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/events");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Webinars");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited - Online Webinars On Industrial Safety'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('events').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	searchtag="";
    searchFor(){
      // console.log(this.searchtag);
      this.listObj.searchKey=this.searchtag;
      this.getEventdata(1);
    }

    geteventlist(){
      // this.api.getAllEvents().subscribe(res => {     
        // console.log(res.response);        
       // this.blogList= res.response.data;

      // });
    }

	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}
    
}
