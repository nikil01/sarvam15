import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../../shared/partials/sliderprddetail/sliderprddetail.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { GlobalService } from '../../global.service';
import { ToastService } from '../../toast.service';

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-relatedproducts',
  standalone: true,
  imports: [CommonModule, SwiperDirectiveDirective, RouterModule, NgbRatingModule, NgbRatingModule, SliderprddetailComponent, NgbTooltipModule],
  templateUrl: './relatedproducts.component.html',
  styleUrls: ['./relatedproducts.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgbRatingConfig, NgbModalConfig, NgbModal],
})
export class RelatedproductsComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  
  imgbank:any;

   filepathmedium:string=Constant.API_ENDPOINT+"shopnow/medium/";
    filepathoriginal:string=Constant.API_ENDPOINT+"shopnow/original/";
    filepaththumbnail:string=Constant.API_ENDPOINT+"shopnow/thumbnail/";

  constructor(config: NgbRatingConfig, modalconfig: NgbModalConfig, private modalService: NgbModal, private api: ApiService, public toastService: ToastService, public loginHead: GlobalService, private router: Router) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;

    modalconfig.backdrop = 'static';
    modalconfig.keyboard = false;
  }



  public config: SwiperOptions = {
    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
    autoHeight: true,
    spaceBetween: 5,
    navigation: true,
    pagination: false,
    scrollbar: false,
    // pagination: {clickable: true, dynamicBullets: true},
    slidesPerView: 1,
    centeredSlides: true,
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


  catid:any;
  ngOnInit(): void {   
    this.catid = sessionStorage.getItem('relcat');
    this.fetchRelatedProducts(this.catid);
     
  }

  

  relatedProducts:any;
  fetchRelatedProducts(catid:any){
   // console.log("selectedCatid", this.loginHead.selectedCatid);
    
    this.api.fetchRelatedItems(catid).subscribe((res) => {
      // console.log("recent", res.response);
      this.relatedProducts=res.response.data; 

    });
  }


  // ============================================================
  addToCart(prdid:any){
    // console.log(prdid);
    this.api.addToCart(prdid, 1).subscribe((res) => {
      if(res.response.result=='added'){
        this.GetWishCartCount();
        this.showSuccess('Product Added To Cart!');
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


     url:any;
    reloadPage(url:any){
      // console.log(url);
      // this.router.navigate(['product/', url]);
      // this.url=url;
      // this.FetchSEOdata(this.url);
      // this.GetWishCartCount();
      this.newItemEvent.emit(url);
    }


    // ================================toast
   showStandard() {
    this.toastService.show('I am a standard toast');
    }

  showSuccess(msg:any) {
      this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 5000 });
    }

  showDanger() {
      this.toastService.show('dangerTpl', { classname: 'bg-danger text-light', delay: 15000 });
    }

  ngOnDestroy(): void {
      this.toastService.clear();
    }


  
}
