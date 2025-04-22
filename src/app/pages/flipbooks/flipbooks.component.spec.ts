import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipbooksComponent } from './flipbooks.component';

describe('FlipbooksComponent', () => {
  let component: FlipbooksComponent;
  let fixture: ComponentFixture<FlipbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FlipbooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlipbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
