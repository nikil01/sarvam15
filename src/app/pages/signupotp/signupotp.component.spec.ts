import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupotpComponent } from './signupotp.component';

describe('SignupotpComponent', () => {
  let component: SignupotpComponent;
  let fixture: ComponentFixture<SignupotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignupotpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
