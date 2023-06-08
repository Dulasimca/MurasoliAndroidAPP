import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMobileComponent } from './news-mobile.component';

describe('NewsMobileComponent', () => {
  let component: NewsMobileComponent;
  let fixture: ComponentFixture<NewsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
