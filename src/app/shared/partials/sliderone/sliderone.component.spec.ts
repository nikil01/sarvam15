import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideroneComponent } from './sliderone.component';

describe('SlideroneComponent', () => {
  let component: SlideroneComponent;
  let fixture: ComponentFixture<SlideroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SlideroneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
