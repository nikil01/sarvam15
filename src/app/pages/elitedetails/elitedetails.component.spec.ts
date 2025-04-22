import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElitedetailsComponent } from './elitedetails.component';

describe('ElitedetailsComponent', () => {
  let component: ElitedetailsComponent;
  let fixture: ComponentFixture<ElitedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ElitedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElitedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
