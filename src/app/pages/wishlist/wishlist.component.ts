import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../shared/partials/sliderprddetail/sliderprddetail.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { GlobalService } from '../../shared/global.service';
import { ToastService } from '../../shared/toast.service';
import { ToastsContainer } from '../../shared/toasts-container.component';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,
	//  NgxBootstrapSliderModule,
	  RouterModule, NgbRatingModule,  SliderprddetailComponent, FormsModule, NgbTooltipModule, ToastsContainer],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
	wishlist:any;
	iswishlistEmpty:boolean = true;
	subbannerimg:string ='assets/img/pagebanner.jpg';
	filepaththumbnail:string=Constant.API_ENDPOINT+"shopnow/thumbnail/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(public toastService: ToastService, public loginHead: GlobalService, private router: Router, config: NgbRatingConfig, modalconfig: NgbModalConfig, private modalService: NgbModal, private api: ApiService, private Activatedroute: ActivatedRoute, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
		// customize default values of ratings used by this component tree
		config.max = 5;
		config.readonly = true;

		modalconfig.backdrop = 'static';
		modalconfig.keyboard = false;
	}


	ngOnInit(): void {
		this.FetchSEOdata("wishlist");
		this.getPageData();
		this.getAlllWishes();
	}


	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('wishlist').subscribe(res => {     
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
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/wishlist"});
	        this.metaService.updateTag({ name: 'og:type', content: "product wishlist"});        
	        this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
          this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/wishlist");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - My Wishlist");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	// ============================================================
	moveToCart(prdid:any, wshid:any){
		// console.log(prdid);
		this.api.moveToCart(prdid, wshid).subscribe((res) => {
			if(res.response.result=='added'){				
				this.showSuccess('Product Moved To Cart!');
			}else{
				this.showSuccess('Product Already Added To Cart!');
			}
			this.GetWishCartCount();
			this.getAlllWishes();
		});
	}


	removeWishlist(prdid:any){
		this.api.removeFromWishList(prdid).subscribe((res) => {
			// console.log(res);
			if(res.response.result=='ok'){
				this.GetWishCartCount();
				this.getAlllWishes();
				this.showSuccess('Product Removed From Wishlist!');
			}else{
				this.showSuccess('Something Went Wrong!');
			}
		});
	}


	getAlllWishes(){
		this.api.fetchWishList().subscribe((res) => {
			if(res.response.recordCount >= 1){
				this.wishlist=res.response.data;
			}else{
				this.iswishlistEmpty = false;
			}
		});
	}

	showSuccess(msg:any) {
			this.toastService.show(msg, { classname: 'bg-success text-light', delay: 5000 });
		}



	GetWishCartCount(){
	    this.api.fetchCartCount().subscribe(res => {     
	      // console.log(res.response);        
	     this.loginHead.CartCount= res.response.cartcount;
	     this.loginHead.wishCount= res.response.wishcount;
	     

	    });
	  }


	  pageBan:any;
		getDeafultpgeBan(){
			this.api.fetchPageDeafultBan().subscribe(res => {     
			  // console.log(res.response);        
			 this.pageBan= res.response;

			});
		}


}
