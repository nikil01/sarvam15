import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
	// footerData:any= [{}];
	OfficeData:any ={};
	FooterLinks:any;

	dta_timings:any;
	dta_linkedin:any;
	dta_facebook:any;
	dta_instagram:any;
	dta_youtube:any;
	// 
	constructor(private api: ApiService) {}
	 ngOnInit() {      
	    this.getSiteData();
	    this.getHeadOfficeData();
	    this.GetFooterLinks();
	  }


	 getSiteData(){
	    this.api.getSiteData().subscribe(res => {     
	      // console.log(res.response);        
	     // this.footerData = res.response;

			this.dta_timings=res.response.dta_timings;
			this.dta_linkedin=res.response.dta_linkedin;
			this.dta_facebook=res.response.dta_facebook;
			this.dta_instagram=res.response.dta_instagram;
			this.dta_youtube=res.response.dta_youtube;

	    });
	  }

	  getHeadOfficeData(){
	    this.api.getOfficeDataOne().subscribe(res => {     
	      // console.log(res.response);        
	     this.OfficeData= res.response;

	    });
	  }

	  GetFooterLinks(){
	    this.api.GetFooterLinks().subscribe(res => {     
	      // console.log(res.response);        
	     this.FooterLinks= res.response.data;

	    });
	  }
}
