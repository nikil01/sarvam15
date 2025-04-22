import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingtestimonialsComponent } from './trainingtestimonials.component';

describe('TrainingtestimonialsComponent', () => {
  let component: TrainingtestimonialsComponent;
  let fixture: ComponentFixture<TrainingtestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TrainingtestimonialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingtestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
