import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-sliderclient',
  standalone: true,
  imports: [CommonModule,SwiperDirectiveDirective],
  templateUrl: './sliderclient.component.html',
  styleUrls: ['./sliderclient.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderclientComponent implements OnInit{

	 clientdata:any;
     filepath:string=Constant.API_ENDPOINT+"sliders/";


	public config: SwiperOptions = {
	    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
	    autoHeight: true,
	    spaceBetween: 18,
	    navigation: true,
	    pagination: false,
	    scrollbar: false,
	    // pagination: {clickable: true, dynamicBullets: true},
	    slidesPerView: 1,
	    centeredSlides: false,
	    breakpoints: {
	      450: {
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
	    this.getclientdata();
	  }

	  getclientdata(){
	    this.api.getClientDta().subscribe(res => {     
	      // console.log(res.response);        
	     this.clientdata= res.response.data;

	    });
	  }


}
