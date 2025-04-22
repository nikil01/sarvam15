import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderteamComponent } from './sliderteam.component';

describe('SliderteamComponent', () => {
  let component: SliderteamComponent;
  let fixture: ComponentFixture<SliderteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SliderteamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
