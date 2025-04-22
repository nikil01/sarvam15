import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderequipmentComponent } from './sliderequipment.component';

describe('SliderequipmentComponent', () => {
  let component: SliderequipmentComponent;
  let fixture: ComponentFixture<SliderequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SliderequipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
