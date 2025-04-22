import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

export class List {
	skp : number=0;
	lmt : number=0;	
	albmid:any;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbRatingModule, NgbTooltipModule, NgbCarouselModule, NgFor, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

	filepath:string=Constant.API_ENDPOINT+"photo/";
	imgbank:any;

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	id:any;

	albumdta:any;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

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

	getAlbum(p:any){
		// this.isLoadingResults = true;

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
		

		this.api.getAlbumPhotos(this.listObj).subscribe((res) => {
			this.albumdta = res.response.data;
			console.log(res);
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
	    AOS.init({disable: 'mobile', once:true});
	    AOS.refresh();
	    this.getAlbum(1);

	    this.Activatedroute.queryParamMap.subscribe((queryParams) => {
			this.listObj.albmid = this.Activatedroute.snapshot.queryParamMap.get('albmid') || '';		
			if(this.listObj.albmid == ''){this.router.navigate(['/album'])}else{
				// console.log(this.id);
				this.getAlbum(1);	
			}
					
		});

	  }

	


  constructor(private api: ApiService, private Activatedroute: ActivatedRoute, private router: Router, private updateSeoTagsService: UpdateSeoTagsService) { }


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


}
