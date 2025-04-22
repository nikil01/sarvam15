import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../shared/partials/sliderprddetail/sliderprddetail.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvasConfig, NgbOffcanvas, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { Options } from '@angular-slider/ngx-slider';

import { GlobalService } from '../../shared/global.service';
import { ToastService } from '../../shared/toast.service';
import { ToastsContainer } from '../../shared/toasts-container.component';

import { SafeurlPipe } from '../../core/services/safeurl.pipe';
import {Title, Meta} from '@angular/platform-browser';
import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';


export class List {
	skp:number=0;
	lmt:number=0;
	category:string = 'featured';
	pricemin:number = 10;
	pricemax:number = 500000;
	OrderBy:string = 'default';
	filters:any;
	brands:any;
	colors:any;
	sizes:any;
	grams:any
	searchKey:string='';
}



@Component({
  selector: 'app-shopnow',
  standalone: true,
  imports: [CommonModule, 
	// NgxBootstrapSliderModule, 
	RouterModule, NgbRatingModule,  SliderprddetailComponent, NgxSliderModule, FormsModule, NgbTooltipModule, ToastsContainer, SafeurlPipe],
  templateUrl: './shopnow.component.html',
  styleUrls: ['./shopnow.component.css'],
  providers: [NgbRatingConfig, NgbModalConfig, NgbModal, NgbOffcanvas],
})
export class ShopnowComponent implements OnInit, OnDestroy{
	viewgrid:boolean = true; 
	imgbank:any;
	colorsel:any;

	selectedCat:any;

	subbannerimg:string ='assets/img/pagebanner.jpg';

	filepathabout:string=Constant.API_ENDPOINT+"site/";  
	

	shopProds:any;  
  	filepathmedium:string=Constant.API_ENDPOINT+"shopnow/medium/";
  	filepathoriginal:string=Constant.API_ENDPOINT+"shopnow/original/";
  	filepaththumbnail:string=Constant.API_ENDPOINT+"shopnow/thumbnail/";

  	bannerPath:string=Constant.API_ENDPOINT+"banner/";

  	listObj:List = new List();
  	// ==================== pagination vars
  	currentPage:number = 1;
	totalPage:number = 0;
	pagesArray:any;
	totalCount:number = 0;
	recordFetch:number = 0;
	recordCount:number = 0;
	rowPerPage:number = 15;
	skipRecord:number = 0;
	recordStart:number = 0;
	btnNext:boolean = true;
	btnPrevious:boolean = false;
	visiblePages:number = 0;
	// ==================== pagination vars

	catid:any;
	brandid:any;
	colorid:any;
	sizeid:any;
	gramsid:any;
	brdnsarray:any = [];
	colorsarray:any = [];
	sizesarray:any = [];
	gramsarray:any = [];
	specsarray:any =[];
	pricemin:any;
	pricemax:any;
	filters:any;
	
	filtrAvaiale:any = [];

	
	getelitedata(p:any){
		// this.isLoadingResults = true;
		// console.log(this.selectedsizes);

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
		

		this.api.getshoppingdata(this.listObj).subscribe((res) => {
			this.shopProds = res.response.data;
			console.log(res.response.data);
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

	sidemenu(content) {
		this.offcanvasService.open(content);
	}



	  ngOnInit(): void {
	  	AOS.init({disable: 'mobile'});
	    AOS.refresh();
	  	this.FetchSEOdata("shopnow");
	  	this.getPageData();
	    
	    // this.getelitedata(1);
	    this.getSideBanner();


		this.Activatedroute.queryParamMap.subscribe((queryParams) => {
			this.listObj.category=this.catid = this.Activatedroute.snapshot.queryParamMap.get('catid') || 'featured';
		
			this.listObj.brands=this.brandid = this.Activatedroute.snapshot.queryParamMap.get('brand') || '';
			this.listObj.colors=this.colorid = this.Activatedroute.snapshot.queryParamMap.get('color') || '';
			this.listObj.sizes=this.sizeid = this.Activatedroute.snapshot.queryParamMap.get('size') || '';

			this.listObj.grams=this.gramsid = this.Activatedroute.snapshot.queryParamMap.get('grams') || '';

			this.listObj.searchKey= this.Activatedroute.snapshot.queryParamMap.get('searchKey') || '';

			this.listObj.skp =  this.skipRecord = parseInt(this.Activatedroute.snapshot.queryParamMap.get('skp')) || 0;
			this.listObj.lmt = this.rowPerPage = parseInt(this.Activatedroute.snapshot.queryParamMap.get('lmt')) || this.rowPerPage;

			this.listObj.OrderBy= this.Activatedroute.snapshot.queryParamMap.get('OrderBy') || 'default';

			this.listObj.pricemin=this.pricemin = parseInt(this.Activatedroute.snapshot.queryParamMap.get('min')) || 10;
			this.listObj.pricemax=this.pricemax = parseInt(this.Activatedroute.snapshot.queryParamMap.get('max')) || 200000;

			this.value = this.listObj.pricemin;
			this.highValue= this.listObj.pricemax;

			this.listObj.filters=this.filters = this.Activatedroute.snapshot.queryParamMap.get('specs') || '';

			const urll = this.router.url;

			this.getAllCategories();
			// this.getAllFilters(this.catid);
			this.getBrands(this.catid);
			this.brdnsarray = this.brandid.split(',');
			sessionStorage.setItem('brnd',this.brdnsarray);

			this.getPriceRange(this.catid);
			this.specsarray = this.filters.split(',');

			this.getColors(this.catid);
			this.colorsarray = this.colorid.split(',');
			sessionStorage.setItem('colx',this.colorsarray);

			this.getSizes(this.catid);			
			this.sizesarray = this.sizeid.split(',');	
			sessionStorage.setItem('sizx',this.sizesarray);		

			this.getGrams(this.catid);
			this.gramsarray = this.gramsid.split(',');

			this.getelitedata(1);
			// console.log(this.filtrlist);

			this.GetWishCartCount();

			

		});

		

	  }

	  
	value: number = this.listObj.pricemin;
	highValue: number = this.listObj.pricemax;
	options: Options = {
		floor: 10,
		ceil: 1000,
	};

  	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('shopnow').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

    FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);, config: NgbModalConfig
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/shopnow"});
	        this.metaService.updateTag({ name: 'og:type', content: "online shopping"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/SHOP ONLINE.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/shopnow");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Online Shop for Safety Products");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

  constructor(public toastService: ToastService, public loginHead: GlobalService, private router: Router, config: NgbRatingConfig, modalconfig: NgbModalConfig, private modalService: NgbModal, private api: ApiService, private Activatedroute: ActivatedRoute, private metaService: Meta, private titleService: Title, private offcanvasService: NgbOffcanvas, MenuConfig: NgbOffcanvasConfig, private updateSeoTagsService: UpdateSeoTagsService) {
		// customize default values of ratings used by this component tree
		config.max = 5;
		config.readonly = true;

		MenuConfig.position = 'start';
		MenuConfig.backdropClass = 'bg-dark';
		MenuConfig.keyboard = true;
		MenuConfig.panelClass='details-panel';

		modalconfig.backdrop = 'static';
		modalconfig.keyboard = false;
	}

	changeview(grid){
		if(grid==true){
			this.viewgrid = true;
		}else{
			this.viewgrid = false;
		}
	}


	prddetails(prdid) {
		const mdlname = 'eliteprddetail';
		this.modalService.open(prdid, { size: 'xl', centered: true });	
		this.imgbank = "assets/img/products/prd1.png";	
	}

	showthisimg(imgsrc){
		this.imgbank = imgsrc;
	}


	// ==============================================================================
	catlist:any;
	getAllCategories(){
		this.api.fetchAllCategoreis().subscribe((res) => {
			// console.log(res.response);
			this.catlist=res.response.data;
		});
	}

	sideBanner:any={};
	getSideBanner(){
		this.api.fetchSideBanner().subscribe((res) => {
			// console.log(res.response);
			this.sideBanner=res.response;
		});
	}

	filtrlist:any;
	
	getAllFilters(catid:any){		
		// console.log(catid);
		this.api.fetchAllFilters(catid).subscribe((res) => {
			// console.log(res.response);
			this.filtrlist=res.response.data;			
			// console.log(this.filtrlist);
		});
	}

	selectedfilters:any = [];
	filterAryToSet:any = [];	
	filterNames:any = [];
	getFltrlist(ev, ftype:any, fvalue:any){
		// console.log(event.target.checked);		
		if (ev.target.checked) {
		 	this.selectedfilters.push(fvalue);

		}else{
		 	let el = this.selectedfilters.find(itm => itm === fvalue);
		 	if (el) this.selectedfilters.splice(this.selectedfilters.indexOf(el), 1);
		 }
		 // console.log(this.selectedbrands);
		 this.router.navigate(['/shopnow'], { queryParams: { specs: [this.selectedfilters]}, queryParamsHandling: "merge"});

	}

	isFltrCheck(id:any){		
		let el = this.specsarray.find(itm => itm === id);
		if (el) {return true;}else{return false;}
	}

	pricerange:any;
	getPriceRange(catid:any){		
		this.api.fetchPriceRange(catid).subscribe((res) => {
			// console.log(res);
			this.pricerange=res.response;	
			this.options= {
				floor: 10,
				ceil: this.pricerange.maxprice,
			};			

			this.value = this.listObj.pricemin;
			this.highValue= this.listObj.pricemax;		
		});
	}

	setPriceRange(){
		// this.value = this.pricerange.minprice;
		// this.highValue= this.pricerange.maxprice+10;		
	}


	brandslist:any;
	brandlistlenth:number = 0;
	brands:any;
	brandLimit:number = 5;
	filteredBrand:any;
	brandswitch:boolean=false;
	getBrands(catid:any){
		
		this.api.fetchBrands(catid).subscribe((res) => {
			// console.log(res);
			this.brandslist=res.response.data;
			this.brandlistlenth=res.response.data.length;
			this.filteredBrand=this.brandslist;
		});
	}

	filterBrand(){
		if(this.brands != ''){
			this.filteredBrand=this.brandslist.filter(s => s.brn_brand.includes(this.brands));
		}else{
			this.filteredBrand=this.brandslist;
		}
		// console.log(this.sizes);
		
		// console.log(this.filteredSize);
	}

	expandBrand(){
		this.brandLimit=this.brandlistlenth;
		this.brandswitch=true;	
	}

	shrinkBrand(){
		this.brandLimit=5;
		this.brandswitch=false;	
	}

	selectedbrands:any = [];
	getbrndlist(event, brndchecked:any){
		// console.log(event.target.checked);		
		this.selectedbrands = [];
		this.selectedbrands = sessionStorage.getItem("brnd").split(',');
		if (event.target.checked) {
		 	this.selectedbrands.push(brndchecked);
		 	sessionStorage.setItem('brnd',this.selectedbrands);
		}else{
		 	let el = this.selectedbrands.find(itm => itm === brndchecked);
		 	if (el) this.selectedbrands.splice(this.selectedbrands.indexOf(el), 1);
		 	sessionStorage.setItem('brnd',this.selectedbrands);
		 }
		 // console.log(this.selectedbrands);
		 this.router.navigate(['/shopnow'], { queryParams: { brand: [this.selectedbrands]}, queryParamsHandling: "merge"});
	}



	isChecked(id:any){		
		let el = this.brdnsarray.find(itm => itm === id);
		if (el) {return true;}else{return false;}
	}

	colorlist:any;
	colorlistlenth:number = 0;
	colors:any;
	colorLimit:number = 5;
	filteredColor:any;
	colorswitch:boolean=false;
	getColors(catid:any){
		
		this.api.fetchColors(catid).subscribe((res) => {
			// console.log(res.response.data);
			this.colorlist=res.response.data;
			this.colorlistlenth=res.response.data.length;
		});
	}

	filterColor(){
		if(this.colors != ''){
			this.filteredColor=this.colorlist.filter(s => s.clr_name.includes(this.colors));
		}else{
			this.filteredColor=this.colorlist;
		}
		// console.log(this.sizes);
		
		// console.log(this.filteredSize);
	}

	expandColor(){
		this.colorLimit=this.colorlistlenth;
		this.colorswitch=true;	
	}

	shrinkColor(){
		this.colorLimit=5;
		this.colorswitch=false;	
	}

	selectedcolors:any = [];
	getcolorlist(event, colorchecked:any){
		// console.log(event.target.checked);		
		this.selectedcolors = [];
		this.selectedcolors = sessionStorage.getItem("colx").split(',');
		if (event.target.checked) {
		 	this.selectedcolors.push(colorchecked);
		 	sessionStorage.setItem('colx',this.selectedcolors);

		}else{
		 	let el = this.selectedcolors.find(itm => itm === colorchecked);
		 	if (el) this.selectedcolors.splice(this.selectedcolors.indexOf(el), 1);
		 	sessionStorage.setItem('colx',this.selectedcolors);
		 }
		 // console.log(this.selectedbrands);
		 this.router.navigate(['/shopnow'], { queryParams: { color: [this.selectedcolors]}, queryParamsHandling: "merge"});
	}



	isClrChecked(id:any){		
		let el = this.colorsarray.find(itm => itm === id);
		if (el) {return true;}else{return false;}
	}


	sizelist:any;
	sizelistlenth:number = 0;
	sizes:any;
	sizeLimit:number = 5;
	filteredSize:any;
	sizeswitch:boolean=false;
	getSizes(catid:any){
		
		this.api.fetchSizes(catid).subscribe((res) => {
			// console.log(res.response.data);
			this.sizelist=res.response.data;
			this.sizelistlenth=res.response.data.length;
			this.filteredSize=this.sizelist;
		});
	}

	filterSize(){
		if(this.sizes != ''){
			this.filteredSize=this.sizelist.filter(s => s.siz_size.includes(this.sizes));
		}else{
			this.filteredSize=this.sizelist;
		}
		// console.log(this.sizes);
		
		// console.log(this.filteredSize);
	}

	expandSize(){
		this.sizeLimit=this.sizelistlenth;
		this.sizeswitch=true;	
	}

	shrinkSize(){
		this.sizeLimit=5;
		this.sizeswitch=false;	
	}

	selectedsizes:any = [];

	getsizelist(event, sizechecked:any){
		this.selectedsizes = [];
		this.selectedsizes = sessionStorage.getItem("sizx").split(',');
		if (event.target.checked) {
		 	this.selectedsizes.push(sizechecked);
		 	sessionStorage.setItem('sizx',this.selectedsizes);
		}else{

		 	let elm = this.selectedsizes.find(itm => itm === sizechecked);
		 	if (elm) {
		 		// console.log("size "+el);
		 		this.selectedsizes.splice(this.selectedsizes.indexOf(elm), 1);	
		 		sessionStorage.setItem('sizx',this.selectedsizes);	 		
		 	};
		 }
		 // console.log(this.selectedsizes);

		 this.router.navigate(['/shopnow'], { queryParams: { size: [this.selectedsizes]}, queryParamsHandling: "merge"});

		// console.log(this.selectedsizes);
	}

	addSizeToArray(sized:any){
		this.selectedsizes.push(sized);
	}



	isSizeChecked(id:any){		
		// console.log(this.sizesarray);	
		
		let el = this.sizesarray.find(itm => itm === id);
		if (el) {return true;}else{return false;}
	}

	gramslist:any;
	getGrams(catid:any){
		
		this.api.fetchGrams(catid).subscribe((res) => {
			// console.log(res);
			this.gramslist=res.response.data;
		});
	}

	selectedgrams:any = [];
	getgramslist(event, gramchecked:any){
		// console.log(event.target.checked);		
		if (event.target.checked) {
		 	this.selectedgrams.push(gramchecked);

		}else{
		 	let el = this.selectedgrams.find(itm => itm === gramchecked);
		 	if (el) this.selectedgrams.splice(this.selectedgrams.indexOf(el), 1);
		 }
		 // console.log(this.selectedbrands);
		 this.router.navigate(['/shopnow'], { queryParams: { size: [this.selectedgrams]}, queryParamsHandling: "merge"});
	}



	isGramsChecked(id:any){		
		let el = this.gramsarray.find(itm => itm === id);
		if (el) {return true;}else{return false;}
	}


	pricechange(){
		// console.log(this.value, this.highValue);

		this.router.navigate(['/shopnow'], { queryParams: { min: [this.value], max: [this.highValue]}, queryParamsHandling: "merge"});
		
	}

	clearFilters(){
		// this.highValue= this.pricerange.maxprice;	
		// this.getPriceRange('featured');
		
		this.listObj.pricemin=0;
		this.listObj.pricemax=0;
		this.value = 10;
		this.highValue= this.pricerange.maxprice;
		this.options= {
				floor: 10,
				ceil: 5000000,
			};	
		// this.setPriceRange();

		this.selectedfilters=[];
		this.selectedbrands=[];
		this.listObj.category='featured';			
		this.router.navigate(['/shopnow']);
		this.getelitedata(1);

		
	}
	

	// ============================================================
	addToCart(prdid:any){
		// console.log(prdid);
		this.api.addToCart(prdid, 1).subscribe((res) => {
			if(res.response.result=='added'){
				this.GetWishCartCount();
				this.showSuccess('Product Added To Cart!');
			}else if(res.response.result=='nostock'){
				this.showDanger('Requested Quantity Is Not In Stock');
			}else{
				this.showSuccess('Product Already Added To Cart!');
			}
			
		});
	}

	addToWishlist(prdid:any){
		this.api.addToWish(prdid).subscribe((res) => {
			if(res.response.result=='done'){
				this.GetWishCartCount();
				this.showSuccess('Product Added To Wishlist!');
			}else{
				this.showSuccess('Product Already Added To Wishlist!');
			}
		});
	}

	// goToProdDtlPge(prdid:any){
	// 	const nxtlink = '/product/'+prdid;
	// 	this.router.navigate([nxtlink]);
	// }
	

	changePageSize(event:Event){
		const newSize = (event.target as HTMLInputElement).value;
		this.rowPerPage =Number(newSize);
		this.router.navigate(['/shopnow'], { queryParams: { lmt: [this.rowPerPage]}, queryParamsHandling: "merge"});		
	}

	changeOrder(event:Event){
		const newOrder = (event.target as HTMLInputElement).value;		
		this.router.navigate(['/shopnow'], { queryParams: { OrderBy: [newOrder]}, queryParamsHandling: "merge"});		
	}

	
	GetWishCartCount(){
	    this.api.fetchCartCount().subscribe(res => {     
	      // console.log(res.response);        
	     this.loginHead.CartCount= res.response.cartcount;
	     this.loginHead.wishCount= res.response.wishcount;
	     

	    });
	  }

	  // ================================toast
 	 showStandard() {
		this.toastService.show('I am a standard toast');
		}

	showSuccess(msg:any) {
			this.toastService.show(msg, { classname: 'bg-success text-light', delay: 5000 });
		}

	showDanger(msg:any) {
			this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 5000 });
		}

	ngOnDestroy(): void {
			this.toastService.clear();
		}



		pageBan:any;
		getDeafultpgeBan(){
			this.api.fetchPageDeafultBan().subscribe(res => {     
			  // console.log(res.response);        
			 this.pageBan= res.response;

			});
		}

}
