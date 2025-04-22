import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventconfirmComponent } from './eventconfirm.component';

describe('EventconfirmComponent', () => {
  let component: EventconfirmComponent;
  let fixture: ComponentFixture<EventconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EventconfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
