import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-slidertestimonials',
  standalone: true,
  imports: [CommonModule,SwiperDirectiveDirective],
  templateUrl: './slidertestimonials.component.html',
  styleUrls: ['./slidertestimonials.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlidertestimonialsComponent {

	 testimonydata:any;
     filepath:string=Constant.API_ENDPOINT+"site/";


		public config: SwiperOptions = {
		    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
		    autoHeight: true,
		    spaceBetween: 0,
		    navigation: false,
		    pagination: {clickable: true, dynamicBullets: true},
		    slidesPerView: 1,
		    centeredSlides: true,
		    slidesPerGroup: 1,
		    breakpoints: {
		      577: {
		        slidesPerView: 1,
		        centeredSlides: true,
		        slidesPerGroup: 1
		      },		      
		      720: {
		        slidesPerView: 1,
		        centeredSlides: true,
		        slidesPerGroup: 1
		      },
		      1000: {
		        slidesPerView: 2,
		        centeredSlides: false,
		        slidesPerGroup: 2
		      },
		      1200: {
		        slidesPerView: 3,
		        centeredSlides: false,
		        slidesPerGroup: 3
		      },
		      1400: {
		        slidesPerView: 2,
		        centeredSlides: false,
		        slidesPerGroup: 2
		      },
		    },
		    autoplay: {
			    delay: 5000,
			  },
		  }


		  constructor(private api: ApiService) {}

		  ngOnInit(): void {   
		    this.getTestimonydata();
		  }

		  getTestimonydata(){
		    this.api.getTestimonydata().subscribe(res => {     
		      // console.log(res.response);        
		     this.testimonydata= res.response.data;

		    });
		  }

 
}


