import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspolicyComponent } from './businesspolicy.component';

describe('BusinesspolicyComponent', () => {
  let component: BusinesspolicyComponent;
  let fixture: ComponentFixture<BusinesspolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BusinesspolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesspolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
