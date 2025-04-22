import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';


@Component({
  selector: 'app-sliderone',
  standalone: true,
  imports: [CommonModule,SwiperDirectiveDirective],
  templateUrl: './sliderone.component.html',
  styleUrls: ['./sliderone.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideroneComponent {

  supplierdata:any;
  filepath:string=Constant.API_ENDPOINT+"sliders/";

  public config: SwiperOptions = {
    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
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


  constructor(private api: ApiService) {}

  ngOnInit(): void {   
    this.getsupplierdata();
  }

  getsupplierdata(){
    this.api.getsupplierdata().subscribe(res => {     
      // console.log(res.response);        
     this.supplierdata= res.response.data;

    });
  }




}
