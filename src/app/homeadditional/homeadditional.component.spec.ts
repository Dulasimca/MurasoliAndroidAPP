import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeadditionalComponent } from './homeadditional.component';

describe('HomeadditionalComponent', () => {
  let component: HomeadditionalComponent;
  let fixture: ComponentFixture<HomeadditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeadditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeadditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
