import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsignupComponent } from './signup.component';

describe('EventsignupComponent', () => {
  let component: EventsignupComponent;
  let fixture: ComponentFixture<EventsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EventsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
