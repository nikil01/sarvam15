import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonilasComponent } from './testimonilas.component';

describe('TestimonilasComponent', () => {
  let component: TestimonilasComponent;
  let fixture: ComponentFixture<TestimonilasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestimonilasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonilasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
