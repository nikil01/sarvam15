import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../shared/partials/sliderprddetail/sliderprddetail.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../core/services/auth.service';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { GlobalService } from '../../shared/global.service';
import { ToastService } from '../../shared/toast.service';
import { ToastsContainer } from '../../shared/toasts-container.component';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p><button class="anibutton btn1" (click)="gotosignin()" (click)="activeModal.dismiss('Cross click')">Login</button> To Checkout.</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdModalContent {	
	constructor(public activeModal: NgbActiveModal, private router: Router) {}

	gotosignin(){
		// console.log(this.router.url);
		sessionStorage.setItem('backlink', this.router.url);
		this.router.navigate(['/signin']);

	}
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, 
	// NgxBootstrapSliderModule,
	 RouterModule, NgbRatingModule,  SliderprddetailComponent, FormsModule, NgbTooltipModule, ToastsContainer],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

	cartlist:any;
	iswishlistEmpty:boolean = true;
	subbannerimg:string ='assets/img/pagebanner.jpg';
	filepaththumbnail:string=Constant.API_ENDPOINT+"shopnow/thumbnail/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  
	
	subtotal:any;
	discount:any;
	

  constructor(public toastService: ToastService, public loginHead: GlobalService, private router: Router, config: NgbRatingConfig, modalconfig: NgbModalConfig, private modalService: NgbModal, private api: ApiService, private Activatedroute: ActivatedRoute, private authService: AuthService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
		// customize default values of ratings used by this component tree
		config.max = 5;
		config.readonly = true;

		modalconfig.backdrop = 'static';
		modalconfig.keyboard = false;
	}


	ngOnInit(): void {
		this.FetchSEOdata("cart");
		// this.checkLogin();
		this.getAllCartItems();
		this.getPageData();
	}


	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/cart"});
	            this.metaService.updateTag({ name: 'og:type', content: "cart"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	            this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/cart");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - My Cart");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('cart').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	checkLogin(){
		this.api.loginCheck().subscribe(res => {   
			let isauth = res.success;  
			if(isauth){
	          // console.warn('true res',res.success);
	          // this.router.navigate(['/']);
	          this.loginHead.showbutton=true;
	          this.loginHead.usrname=sessionStorage.getItem('name');
	        }else{
	        	this.authService.logout();
		        sessionStorage.clear();
		        this.loginHead.showbutton=false;
		        this.router.navigate(['/signin']);   
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
			this.getAllCartItems();
		});
	}


	removeWishlist(prdid:any){
		this.api.removeFromWishList(prdid).subscribe((res) => {
			// console.log(res);
			if(res.response.result=='ok'){
				this.GetWishCartCount();
				this.getAllCartItems();
				this.showSuccess('Product Removed From Wishlist!');
			}else{
				this.showSuccess('Something Went Wrong!');
			}
		});
	}

	deleteCartItem(prdid:any){
		this.api.DeleteFromCart(prdid).subscribe((res) => {
			// console.log(res);
			if(res.response.result=='ok'){
				this.showSuccess('Product Removed From Cart!');
				this.GetWishCartCount();
				this.getAllCartItems();				
			}else{
				this.showSuccess('Something Went Wrong!');
			}
		});
	}


	getAllCartItems(){
		this.api.fetchCartList().subscribe((res) => {
			if(res.response.recordCount >= 1){
				this.cartlist=res.response.data;
				this.getTotal();
			}else{
				this.iswishlistEmpty = false;
			}
		});
	}

	getTotal(){


		let totalvalue = 0;
		this.cartlist.forEach(function (value) {
		  const subsum = value.ctl_discount*value.crt_quantity;
		  totalvalue = totalvalue + subsum;
		});		

		if(this.couponStatus){
			this.subtotal = totalvalue - this.couponDiscount;
		}else{
			this.subtotal=totalvalue;
		}
	}


	couponcode:string ='';
	couponMessage:string='';
	couponDiscount:number=0;
	couponType:any='';
	couponStatus:boolean=false;
	checkCouponCode(){
		this.api.checkCouponCode(this.couponcode).subscribe((res) => {
			this.couponMessage=res.response.message;
			this.couponDiscount=res.response.discount;
			this.couponType=res.response.type;
			this.couponStatus=res.response.status;
			this.getTotal();
		});
		// this.couponMessage="This Coupon Code is not applicable to any products in cart or to Billing amount."		
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
					this.deliverymsg = "This Location Is Delivarable, Proceed to Checkout.";
					this.showSuccess('This Location Is Delivarable, Proceed to Checkout.');
				}else{
					this.deliverymsg = "Not Delivarable!";
					this.showDanger('This Location Is Not Delivarable');
				}	
			});
			
		}else{
			this.deliverystat=false;
			this.deliverymsg = "Enter Valid PIN";
		}		
	}

	setFocus() {    
	    
		 document.getElementById('pincode').focus();
	  }

	checkout(){
		if(this.couponType == ''){this.couponType = 'new';}
		if(sessionStorage.getItem('token')){
			this.api.loginCheck().subscribe(res => {
				if(res.success){
					if(this.couponcode == ''){this.couponcode='none';}		
					this.router.navigate(['checkout/',this.couponcode, this.couponType]);
				}else{
					this.modalService.open(NgbdModalContent);
				}
			});
			
		}else{
			this.modalService.open(NgbdModalContent);
		}
	}

	showSuccess(msg:any) {
			this.toastService.show(msg, { classname: 'bg-success text-light', delay: 5000 });
		}

	showDanger(msg:any) {
			this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 5000 });
		}



	GetWishCartCount(){
	    this.api.fetchCartCount().subscribe(res => {     
	      // console.log(res.response);        
	     this.loginHead.CartCount= res.response.cartcount;
	     this.loginHead.wishCount= res.response.wishcount;
	     

	    });
	  }


	qntityIncrease(prdid:any, id:any, qnty:any){		
		const newquantity = parseInt(qnty) + 1;		
		this.api.updateCart(prdid, id, newquantity).subscribe(res => {    
			if(res.response=='updated'){
				this.getAllCartItems();
	     		this.checkCouponCode();
				this.showSuccess('Cart Updated!');
			}else if(res.response=='failed'){
				this.showDanger('Requested Quantity Is Not In Stock');
			}else{
				this.showSuccess('Somthing Went Wrong!');
			} 
	     	
	    });	
	}

	qntityDecrease(prdid:any, id:any, qnty:number){
		if(qnty >=2){			
			const newquantity = qnty-1;
			this.api.updateCart(prdid, id, newquantity).subscribe(res => {     
		     	if(res.response=='updated'){
					this.getAllCartItems();
		     		this.checkCouponCode();
					this.showSuccess('Cart Updated!');
				}else if(res.response=='failed'){
					this.showDanger('Requested Quantity Is Not In Stock');
				}else{
					this.showSuccess('Somthing Went Wrong!');
				} 
		    });			
		}		
	}

	qntityChange(prdid:any, id:any, $event){
		const newquantity = $event.target.value;
		if(newquantity >=1){			
			
			this.api.updateCart(prdid, id, newquantity).subscribe(res => {     
		     	if(res.response=='updated'){
					this.getAllCartItems();
		     		this.checkCouponCode();
					this.showSuccess('Cart Updated!');
				}else if(res.response=='failed'){
					this.showDanger('Requested Quantity Is Not In Stock');
				}else{
					this.showSuccess('Somthing Went Wrong!');
				} 
	    	});	
		}else{
			const newquantity = 1;
			this.api.updateCart(prdid, id, newquantity).subscribe(res => {     
		     	if(res.response=='updated'){
					this.getAllCartItems();
		     		this.checkCouponCode();
					this.showSuccess('Cart Updated!');
				}else if(res.response=='failed'){
					this.showDanger('Requested Quantity Is Not In Stock');
				}else{
					this.showSuccess('Somthing Went Wrong!');
				} 
		    });	
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
