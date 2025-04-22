import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninpwdComponent } from './signinpwd.component';

describe('SigninpwdComponent', () => {
  let component: SigninpwdComponent;
  let fixture: ComponentFixture<SigninpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SigninpwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
