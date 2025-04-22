import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';
import {Title, Meta} from '@angular/platform-browser';
import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

export class List {
	skp : number=0;
	lmt : number=0;	
}

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbRatingModule, NgbTooltipModule],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
	closeResult = '';

	filepath:string=Constant.API_ENDPOINT+"photo/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";
	imgbank:any;

	albumdta:any;

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
		

		this.api.getAlbumData(this.listObj).subscribe((res) => {
			this.albumdta = res.response.data;
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
		this.FetchSEOdata("album");
	    AOS.init({disable: 'mobile', once:true});
	    AOS.refresh();
	    this.getAlbum(1);
	    // this.getDeafultpgeBan();	 
	    this.getPageData();
	  }

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/album"});
	          this.metaService.updateTag({ name: 'og:type', content: "Photo Gallery"});        
	          this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/album");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Photo Gallery");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});

			
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('album').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

  constructor(private api: ApiService, private modalService: NgbModal, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }

	imgToModl:any;
	open(content, img) {
		this.imgToModl=img;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	pageBan:any;
	  getDeafultpgeBan(){
	    this.api.fetchPageDeafultBan().subscribe(res => {     
	      // console.log(res.response);        
	     this.pageBan= res.response;

	    });
	  }


}
