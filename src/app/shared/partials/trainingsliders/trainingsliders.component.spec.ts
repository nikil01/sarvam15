import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderequipmentComponent } from './trainingsliders.component';

describe('TrainingslidersComponent', () => {
  let component: TrainingslidersComponent;
  let fixture: ComponentFixture<TrainingslidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TrainingslidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingslidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
