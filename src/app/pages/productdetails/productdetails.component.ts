import { Component, NgModule  } from '@angular/core';

import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../shared/partials/sliderprddetail/sliderprddetail.component';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { NgFor } from '@angular/common';

import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { GlobalService } from '../../shared/global.service';
import { ToastService } from '../../shared/toast.service';
import { ToastsContainer } from '../../shared/toasts-container.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';
import { ScrollService } from '../../shared/scroll.service';

import { SeoService } from '../../core/services/seo.service';

import { RecentproductsComponent } from '../../shared/partials/recentproducts/recentproducts.component';
import { RelatedproductsComponent } from '../../shared/partials/relatedproducts/relatedproducts.component';


import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxImageZoomModule } from 'ngx-image-zoom';

import {Title, Meta} from '@angular/platform-browser';

import AOS from 'aos';


import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../directives/swiper-directive.directive";
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbNavModule, SliderprddetailComponent, FormsModule, ReactiveFormsModule, RelatedproductsComponent, RecentproductsComponent, NgxImageZoomModule, NgbRatingModule, NgbCollapseModule, ToastsContainer, NgbTooltipModule, SwiperDirectiveDirective],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  providers: [NgbRatingConfig, NgbModalConfig, NgbModal],  
})
export class ProductdetailsComponent {
	selSize:string='0';
	selColor:string='null';

	active = 1;
	focussedimg:any;
	url:any;
	elitedata:any={};  
	prdimages:any;
	colorscale:any;
	prddetails:any;
	prdfeatures:any;
	imgone:any;
	branddata:any;
	catdata:any;

	quantity:number =1;
	subtotal:any;
	price:any;

	public isCollapsed = false;

	varientsItems:any;

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  	filepathmedium:string=Constant.API_ENDPOINT+"shopnow/medium/";
  	filepathoriginal:string=Constant.API_ENDPOINT+"shopnow/original/";
  	filepaththumbnail:string=Constant.API_ENDPOINT+"shopnow/thumbnail/";

  	filepathbrand:string=Constant.API_ENDPOINT+"site/suppliers/";

  constructor(public toastService: ToastService, public loginHead: GlobalService, private buildr: FormBuilder, private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router, modalconfig: NgbModalConfig, private modalService: NgbModal, private seo: SeoService, private scrollService: ScrollService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
		modalconfig.backdrop = 'static';
		modalconfig.keyboard = false;

		
	}


	imgbank:any;
	imgbankfull:any;
	thumbimg:any;

	subtn:boolean = true;
	btnerr:string = '';

	tabone:boolean=true;
	tabtwo:boolean=false;
	tabthree:boolean=false;


	public config: SwiperOptions = {
	    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar, EffectCards],
	    autoHeight: true,
	    spaceBetween: 0,
	    navigation: true,
	    pagination: false,
	    scrollbar: false,

	    // pagination: {clickable: true, dynamicBullets: true},
	    slidesPerView: "auto",
	    centeredSlides: false,
	    breakpoints: {
	      400: {
	        slidesPerView: "auto",
	        centeredSlides: false
	      },
	    },
	      autoplay: {
	      delay: 5000,
	    },
	  }

	
	ngOnInit(): void {		
		this.getPageData();
		// this.seo.FetchSEOdata();
		AOS.init({ once: true, disable: 'mobile'});
	    AOS.refresh();
	   
	    this.url = this.activatedRoute.snapshot.params['prdid'];
	    this.FetchSEOdata(this.url);
	    this.GetWishCartCount();

	 //    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
		// 	this.url = this.activatedRoute.snapshot.params['prdid'];	
		// 	if(this.url == ''){this.router.navigate(['/shopnow'])}else{
		// 		// console.log(this.id);
		// 		this.FetchSEOdata(this.url);
	 //    		this.GetWishCartCount();
		// 	}
					
		// });


	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('product').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	isSize:any;
	isColor:any;
	varientsSizes:any;
	varientsColors:any;
	fetchVarients(varid:any){
		// console.log("varients", varid);
		this.api.getVarients(varid).subscribe((res) => {
			// console.log("varients", res.response.data);
			this.varientsItems=res.response.data;	

		});
	}

	fetchSizeVarients(varid:any){
		// console.log("varients", varid);
		this.api.getVarientsSize(varid).subscribe((res) => {
			// console.log("varients", res.response.data);
			// const srted = res.response.data.sort();
			this.varientsSizes=res.response.data;
			if(res.response.data){
				this.isSize=res.response.data.length; 
				sessionStorage.setItem("size",this.elitedata.ctl_filter_size);	
			}else{
				this.isSize=0;
				sessionStorage.setItem("size",'0');				
			}
			

		});
	}

	pincode:any;
	deliverystat:boolean = false;
	deliverymsg:any;
	checkpin(){
		// console.log(this.pincode.toString().length);
		if(this.pincode.toString().length == 6){
			this.api.checkPinCode(this.pincode).subscribe((res) => {
				this.deliverystat = res.response;
				if(this.deliverystat){
					this.deliverymsg = "Delivarable!";
				}else{
					this.deliverymsg = "Not Delivarable!";
				}	
			});
			
		}else{
			this.deliverystat=false;
			this.deliverymsg = "Enter Valid PIN";
		}		
	}

	fetchColorVarients(varid:any){
		// console.log("varients", varid);
		this.api.getVarientsColor(varid).subscribe((res) => {
			// console.log("varients", res.response.data);
			this.varientsColors=res.response.data;		

			if(res.response.data){
				this.isColor=res.response.data.length;
				sessionStorage.setItem("color",this.elitedata.ctl_filter_color);
			}else{
				this.isColor=0;
				sessionStorage.setItem("color",'null');
			}	
			

		});
	}

	

	changeSize(size:string){
		// this.selSize=size;
		sessionStorage.setItem("size",size);
		this.getVarUrl();
	}

	changeColor(color:string){
		// this.selColor=color;
		sessionStorage.setItem("color",color);
		this.getVarUrl();
	}

	getVarUrl(){
		// console.log(this.elitedata.ctl_filter_size, this.elitedata.ctl_filter_color, this.varientId);
		
		if(sessionStorage.getItem("size")){
			this.selSize = sessionStorage.getItem("size");
		}else{
			this.selSize = this.elitedata.ctl_filter_size ;
		}


		if(sessionStorage.getItem("color")){
			this.selColor = sessionStorage.getItem("color");
		}else{
			this.selColor = this.elitedata.ctl_filter_color; 
		}
		// console.log(this.selSize, this.selColor);
		this.api.fetchOptionData(this.selSize, this.selColor, this.varientId).subscribe((res) => {
			// console.log(this.selSize, this.selColor);
			if(res.response.seo != 'NA'){
				this.reloadPage(res.response.seo);
			}else{
				this.showSuccess('We dont have specified product!');
			}			
		});
	}

	reloadPage(url:any){
		
		// console.log(url);
		this.router.navigate(['product/', url]);
		this.url=url;
		this.FetchSEOdata(this.url);
	    this.GetWishCartCount();


	}

	scrollDown(element: HTMLElement){
		// this.scroller.scrollToAnchor("readmore");
		element.scrollIntoView({ behavior: "smooth" });
	}

	FetchSEOdata(url:any){
		this.api.fetchSeoData(url).subscribe((res) => {
			// console.log(res.response);
			if(res.success){
				this.getEliteProductData(res.response.seo_pgeid);
				this.titleService.setTitle(res.response.seo_title);
				this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
				this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

				this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/product/"+this.url});
        this.metaService.updateTag({ name: 'og:type', content: "Product"});        
	      this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
        this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/product/" + this.url);
	            
			}else{
				this.router.navigate(['page-not-found']);
			}			
		});
		this.selSize='0';
		this.selColor='null';
	}

	loadfull(){
		this.chrlit = this.proddescriptionsize +10;
	}
	loadless(){
		this.chrlit = 300;
	}

	proddescription:any;
	proddescriptionsize:number = 0;
	chrlit:number = 300;
	showRelprod:boolean=false;
	showRecntprod:boolean=false;
	varientId:string;
	getEliteProductData(prdid:any){
		this.api.getProductdetail(prdid).subscribe((res) => {
			
			sessionStorage.setItem('relcat', res.response.data.ctl_catid);
			if(sessionStorage.getItem('relcat')){
				this.showRelprod=true;
			}
			
			// console.log(this.loginHead.selectedCatid);
			this.proddescription=res.response.data.ctl_description;
			this.proddescriptionsize=res.response.data.ctl_description.length;
			// console.log(res.response.data);
			this.elitedata=res.response.data;
			this.varientId=res.response.data.ctl_varientid;
			this.catdata=res.response.category;
			this.prdimages=res.response.images;
			this.colorscale=res.response.colorscale;
			// this.prddetails=res.response.detail;			
			// this.prdfeatures=res.response.features;
			this.branddata=res.response.brand;

			// console.log(res.response.data.ctl_varient);
			this.fetchVarients(res.response.data.ctl_id);
			this.fetchSizeVarients(res.response.data.ctl_id);
			this.fetchColorVarients(res.response.data.ctl_id);
			
			this.imgbank=this.filepathmedium+res.response.imgone.img_image;
			this.imgbankfull=this.filepathoriginal+res.response.imgone.img_image;
			this.thumbimg=this.filepaththumbnail+res.response.imgone.img_image;
			
			this.focussedimg=res.response.imgone.img_image;
			this.price= res.response.data.ctl_discount;
			this.subtotal = this.quantity * this.price;

			this.metaService.updateTag({ name: 'og:image', content: Constant.API_ENDPOINT+"shopnow/medium/"+res.response.imgone.img_image});
		});
		
	}

	showthisimg(imgsrc){		
		this.imgbank = this.filepathmedium+imgsrc;
		this.imgbankfull=this.filepathoriginal+imgsrc;	
		this.thumbimg=this.filepaththumbnail+imgsrc;
		this.focussedimg=imgsrc;
	}
	
	
	qntityIncrease(){
		this.quantity = this.quantity+1;
		this.subtotal = this.quantity * this.price;
	}

	qntityDecrease(){
		if(this.quantity >=2){
			this.quantity = this.quantity-1;
			this.subtotal = this.quantity * this.price;
		}
		
	}

	qntityChange(){
		if(this.quantity >=1){			
			this.subtotal = this.quantity * this.price;
		}else{
			this.subtotal = 1 * this.price;
			this.quantity =1;
		}
		
	}


	showtab1(){
		this.tabone=true;
		this.tabtwo=false;
		this.tabthree=false;
	}

	showtab2(){
		this.tabone=false;
		this.tabtwo=true;
		this.tabthree=false;
	}

	showtab3(){
		this.tabone=false;
		this.tabtwo=false;
		this.tabthree=true;
	}

	// ============================================================
	addToCart(prdid:any){
		// console.log(prdid);
		this.api.addToCart(prdid, this.quantity).subscribe((res) => {
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
