import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgbCarouselModule, NgFor, FormsModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

	banheight:number = 574;
	bannerdta:any;
	screensize:number =0;
  	filepathbanner:string=Constant.API_ENDPOINT+"banner/";

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	constructor(private router: Router, private api: ApiService) {}

	ngOnInit() {    	   
		this.screensize = window.innerWidth;
		if(this.screensize <= 576){
			this.banheight = 180;
		}else if(this.screensize > 577 && this.screensize < 719){
			this.banheight = 220;
		}else if(this.screensize > 720 && this.screensize < 1199){
			this.banheight = 360;
		}else if(this.screensize > 1200 && this.screensize < 1399){
			this.banheight = 420;
		}else{
			this.banheight = 574;
		}
	    this.getbannerdata();
	  }

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

	getbannerdata(){
	    this.api.getMainSlider().subscribe(res => {     
	      // console.log(res.response);        
	     this.bannerdta= res.response.data;

	    });
	  }

}
