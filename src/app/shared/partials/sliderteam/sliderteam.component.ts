import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Scrollbar} from 'swiper';
import {SwiperDirectiveDirective} from "../../../directives/swiper-directive.directive";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../api.service';
import { Constant } from '../../constant';

@Component({
  selector: 'app-sliderteam',
  standalone: true,
  imports: [CommonModule, SwiperDirectiveDirective, NgbTooltipModule],
  templateUrl: './sliderteam.component.html',
  styleUrls: ['./sliderteam.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderteamComponent implements OnInit{
  teamdat:any;
  filepath:string=Constant.API_ENDPOINT+"site/";

  public config: SwiperOptions = {
    // modules: [Navigation, Pagination, A11y, Mousewheel, Scrollbar, EffectCards],
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
    this.getteamdata();
  }

  getteamdata(){
    this.api.getteamdata().subscribe(res => {     
      // console.log(res.response);        
     this.teamdat= res.response.data;

    });
  }




}
