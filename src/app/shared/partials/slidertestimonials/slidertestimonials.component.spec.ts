import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidertestimonialsComponent } from './slidertestimonials.component';

describe('SlidertestimonialsComponent', () => {
  let component: SlidertestimonialsComponent;
  let fixture: ComponentFixture<SlidertestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SlidertestimonialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidertestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
