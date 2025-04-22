import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderprddetailComponent } from './sliderprddetail.component';

describe('SliderprddetailComponent', () => {
  let component: SliderprddetailComponent;
  let fixture: ComponentFixture<SliderprddetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SliderprddetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderprddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
