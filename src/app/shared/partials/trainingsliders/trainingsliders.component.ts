import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";


import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-trainingsliders',
  standalone: true,
  imports: [CommonModule,SwiperDirectiveDirective],
  templateUrl: './trainingsliders.component.html',
  styleUrls: ['./trainingsliders.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrainingslidersComponent {

	trainigtopics:any;
	trainigHeading:any;
	isselected:string = 'all';
  	filepath:string=Constant.API_ENDPOINT+"training/";

	 public config: SwiperOptions = {
	    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar],
	    autoHeight: true,
	    spaceBetween: 2,
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


	  constructor(private api: ApiService) {}

	  ngOnInit(): void {   
	    this.getTrainingData('all');
	    this.getTrainingHeadings();
	  }

	  getTrainingData(id:any){
	    this.api.getTrainingTopics(id).subscribe(res => {     
	      // console.log(res.response);        
	     this.trainigtopics= res.response.data;

	    });
	  }

	  getTrainingHeadings(){
	    this.api.getTrainingHeading().subscribe(res => {     
	      // console.log(res.response);        
	     this.trainigHeading= res.response.data;

	    });
	  }

	  selectedid:string='all';
	  showgroup(id:any){
	  	this.selectedid = id;
	  	this.getTrainingData(id);	  	  	
	  }


}
