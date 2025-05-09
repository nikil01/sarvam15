import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {SwiperOptions} from "swiper";

@Directive({
  selector: '[appSwiperDirective]',
  standalone: true,
})
export class SwiperDirectiveDirective implements AfterViewInit {

   private readonly swiperElement: HTMLElement;

  @Input('config')
  config?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit() {
    Object.assign(this.el.nativeElement, this.config);
    
    // @ts-ignore
    this.el.nativeElement.initialize();
  }

}




