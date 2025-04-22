import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderclientComponent } from './sliderclient.component';

describe('SliderclientComponent', () => {
  let component: SliderclientComponent;
  let fixture: ComponentFixture<SliderclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SliderclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
