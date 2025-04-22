import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule,SwiperDirectiveDirective, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogsComponent {

	filepathblog:string=Constant.API_ENDPOINT+"blog/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  	
	blogdta:any;

	public config: SwiperOptions = {
	    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
	    autoHeight: true,
	    spaceBetween: 5,
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


	  constructor(private api: ApiService, private router: Router) {}

	  ngOnInit(): void {   
	    this.getThreeBlog();
	  }

	  getThreeBlog(){
	    this.api.getThreeBlog().subscribe(res => {
	     this.blogdta= res.response.data;
	    });
	  }


}
