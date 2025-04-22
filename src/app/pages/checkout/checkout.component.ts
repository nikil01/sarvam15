import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../shared/partials/sliderprddetail/sliderprddetail.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { GlobalService } from '../../shared/global.service';
import { ToastService } from '../../shared/toast.service';
import { ToastsContainer } from '../../shared/toasts-container.component';

import {Title, Meta} from '@angular/platform-browser';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
  selector: 'app-checkout',
  standalone: true,  
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [CommonModule,
	//  NgxBootstrapSliderModule, 
	 RouterModule, NgbRatingModule,  SliderprddetailComponent, FormsModule, NgbTooltipModule, ToastsContainer, ReactiveFormsModule]
})
export class CheckoutComponent {

	cartlist:any;
	iswishlistEmpty:boolean = true;
	subbannerimg:string ='assets/img/pagebanner.jpg';
	filepaththumbnail:string=Constant.API_ENDPOINT+"shopnow/thumbnail/";

	filepathabout:string=Constant.API_ENDPOINT+"site/";  

	address:any;
	subtotal:any;

	coupontype:any;
	couponcode:any;

	errmsg:string='';
		usrname:any=sessionStorage.getItem('name');
		profileData:any;


	couponMessage:string='';
	couponDiscount:number=0;
	couponType:any='';
	couponStatus:boolean=false;

	regfrm: FormGroup = new FormGroup({
		name: this.buildr.control(''),
		email: this.buildr.control(''),
		mobile: this.buildr.control(''),
		company: this.buildr.control(''),	
		gst: this.buildr.control(''),
		ba: this.buildr.control(''),
		da: this.buildr.control(''),
		couponcode: this.buildr.control('none'),
		coupontype: this.buildr.control('none'),
	});
	submitted = false;

  constructor(public toastService: ToastService, public loginHead: GlobalService, private router: Router, config: NgbRatingConfig, modalconfig: NgbModalConfig, private modalService: NgbModal, private api: ApiService, private Activatedroute: ActivatedRoute, private authService: AuthService, private buildr: FormBuilder, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
		// customize default values of ratings used by this component tree
		config.max = 5;
		config.readonly = true;

		modalconfig.backdrop = 'static';
		modalconfig.keyboard = false;
	}



	ngOnInit(): void {
		this.FetchSEOdata("checkout");
		if(!sessionStorage.getItem("token")){this.router.navigate(['/signin']);}
		this.couponcode = this.Activatedroute.snapshot.params['coupon'];
    	this.coupontype = this.Activatedroute.snapshot.params['type'];

		this.checkLogin();
		this.getAllCartItems();
		this.getMyProfile();
		this.checkCouponCode();
		this.getPageData();


		this.regfrm = this.buildr.group(
			{
				name: ['', Validators.required],
				mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6111111111), Validators.max(9999999999)]],
				email: ['', [Validators.required, Validators.email]],				
				company: ['', Validators.required],
				gst: [''],
				ba: ['', Validators.required],
				da: ['', Validators.required],
				couponcode: ['', Validators.required],
				coupontype: ['', Validators.required],
			}
		);

	}

	FetchSEOdata(url:any){
	    this.api.fetchSeoData(url).subscribe((res) => {
	      // console.log(res.response);
	      if(res.success){
	       
	        this.titleService.setTitle(res.response.seo_title);
	        this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
	        this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

	        this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/checkout"});
	            this.metaService.updateTag({ name: 'og:type', content: "checkout"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
	            this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description});
          this.metaService.updateTag({ name: 'og:image', content: "https://www.sarvamsafety.com/assets/ogimg/HOME.jpg" });
          this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/checkout");
	      }else{
	        // this.router.navigate(['page-not-found']);
	        this.titleService.setTitle("Sarvam Safety Private Limited - Checkout");
			this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
			this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});
	      }     
	    });
	   
	  }

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('checkout').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	getMyProfile(){
			this.api.getMyProfile().subscribe(res => {			
				this.profileData=res.response;
				this.regfrm.patchValue({
					name:this.profileData.cst_name,
					mobile:this.profileData.cst_mobile,
					email:this.profileData.cst_email,
					company:this.profileData.cst_firmid,
					couponcode:this.couponcode,
					coupontype:this.coupontype,
				});
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

	slimtotal:any;
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
		this.slimtotal=totalvalue;
	}



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


	 get f(): { [key: string]: AbstractControl } {
			return this.regfrm.controls;
		}


	onSubmit(): void {
			this.submitted = true;

			if (this.regfrm.invalid) {
				return;
			}
			// console.log(JSON.stringify(this.regfrm.value, null, 2));
			this.prepareOrder();
		}

		onReset(): void {
			this.submitted = false;
			this.regfrm.reset();
		}

		
	 prepareOrder(){
	 	this.api.prepareOrder(this.regfrm.value).subscribe((res) => {
			if(res.success){
				// console.log('registered');				
				if(res.response.result == 'ok'){
					const encpadta = res.response.apitopay;					
						const eurl = "https://paypg.icicibank.com/payment-capture/?"+encpadta;
						setTimeout(() => { window.location.href = eurl; }, 1000);					
				}else{

				}


				// setTimeout(() => { window.location.href = eurl; }, 3000);
				// setTimeout(() => { this.router.navigate(['/eventpayment']); }, 3000);				
			}else{
				// console.log('dublicate');
			}
		});
	 }

	 payment(){

	 }


	 pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

}
