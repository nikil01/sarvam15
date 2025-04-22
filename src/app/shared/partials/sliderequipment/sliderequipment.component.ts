import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-sliderequipment',
  standalone: true,
  imports: [CommonModule,SwiperDirectiveDirective,RouterModule],
  templateUrl: './sliderequipment.component.html',
  styleUrls: ['./sliderequipment.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderequipmentComponent {

	equipments:any;
  	filepath:string=Constant.API_ENDPOINT+"sliders/";

	 public config: SwiperOptions = {
	    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
	    autoHeight: true,
	    spaceBetween: 30,
	    navigation: false,
	    pagination: false,
	    scrollbar: false,
	    // pagination: {clickable: true, dynamicBullets: true},
	    slidesPerView: 1,
	    centeredSlides: false,
	    slidesPerGroup: 1,
	    breakpoints: {
	      577: {
	        slidesPerView: 2,
	        centeredSlides: false,
	        slidesPerGroup: 2
	      },		      
	      720: {
	        slidesPerView: 3,
	        centeredSlides: false,
	        slidesPerGroup: 3
	      },
	      1200: {
	        slidesPerView: 3,
	        centeredSlides: false,
	        slidesPerGroup: 3
	      },
	      1400: {
	        slidesPerView: 4,
	        centeredSlides: false,
	        slidesPerGroup: 4
	      },
	    },
	    autoplay: {
		    delay: 5000,
		  },
	  }


	  constructor(private api: ApiService, private router: Router) {}

	  ngOnInit(): void {   
	    this.getEquipmentData();
	  }

	  getEquipmentData(){
	    this.api.getEquipmentData().subscribe(res => {     
	      // console.log(res.response);        
	     this.equipments= res.response.data;

	    });
	  }


}
