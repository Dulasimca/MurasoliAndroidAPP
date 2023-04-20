import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictNewsComponent } from './district-news.component';

describe('DistrictNewsComponent', () => {
  let component: DistrictNewsComponent;
  let fixture: ComponentFixture<DistrictNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
