import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sliderprddetail',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, NgFor, FormsModule],
  templateUrl: './sliderprddetail.component.html',
  styleUrls: ['./sliderprddetail.component.css'],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderprddetailComponent {
	images = [
		"assets/img/products/prd1.png",
		"assets/img/products/prd2.png",
		"assets/img/products/prd3.png",
		"assets/img/products/prd4.png"
	];

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}


}


