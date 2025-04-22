import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import {Title, Meta} from '@angular/platform-browser';

import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

export class List {
	skp : number=0;
	lmt : number=0;
	searchKey : string = '';
	slOrder : string = 'DESC' ;
	status : string = 'All';
}

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbRatingModule, NgbTooltipModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal]
})
export class CatalogueComponent {
	imgbank:any;

	elitedata:any;  
  	filepathmedium:string=Constant.API_ENDPOINT+"elite/medium/";
  	filepathoriginal:string=Constant.API_ENDPOINT+"elite/original/";
  	filepaththumbnail:string=Constant.API_ENDPOINT+"elite/thumbnail/";

  	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  	listObj:List = new List();
  	// ==================== pagination vars
  	currentPage:number = 1;
	totalPage:number = 0;
	pagesArray:any;
	totalCount:number = 0;
	recordFetch:number = 0;
	recordCount:number = 0;
	rowPerPage:number = 16;
	skipRecord:number = 0;
	recordStart:number = 0;
	btnNext:boolean = true;
	btnPrevious:boolean = false;
	visiblePages:number = 0;
	// ==================== pagination vars

	getelitedata(p:any){
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
		

		this.api.getelitedata(this.listObj).subscribe((res) => {
			this.elitedata = res.response.data;
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

		document.body.scrollTop = 0; // For Safari
  		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	ngOnInit() {
		this.FetchSEOdata("elite-products");
	    AOS.init({disable: 'mobile'});
	    AOS.refresh();

	    this.Activatedroute.queryParamMap.subscribe((queryParams) => {
	    	this.listObj.searchKey= this.Activatedroute.snapshot.queryParamMap.get('searchKey') || '';
	    })
	    this.getelitedata(1);
	    this.getPageData();
	  }

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/elite-products"});
	            this.metaService.updateTag({ name: 'og:type', content: "elite products"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	            this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/Catalogue.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/elite-products");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Product Catalogue");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	  pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('elite-products').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }


  constructor(config: NgbModalConfig, private modalService: NgbModal, private api: ApiService, private Activatedroute: ActivatedRoute, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	prddetails(prdid) {
		const mdlname = 'eliteprddetail';
		this.modalService.open(prdid, { size: 'xl', centered: true });	
		this.imgbank = "assets/img/products/prd1.png";	
	}

	showthisimg(imgsrc){
		this.imgbank = imgsrc;
	}

	
	changePageSize(event:Event){
		const newSize = (event.target as HTMLInputElement).value;
		this.rowPerPage =Number(newSize);
		this.getelitedata(1);
	}

	getPageProperty(event:Event){
		const newPage = (event.target as HTMLInputElement).value;
		let Pager =Number(newPage);
			if(Pager > this.totalPage){
			// this.toastr.warning('Request Pages From 1 to '+this.totalPage+' Only');
			
		}else{
			this.getelitedata(Pager);
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
