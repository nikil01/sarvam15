import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninotpComponent } from './signinotp.component';

describe('SigninotpComponent', () => {
  let component: SigninotpComponent;
  let fixture: ComponentFixture<SigninotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SigninotpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
