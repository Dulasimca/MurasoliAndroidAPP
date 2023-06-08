import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathipuMobileComponent } from './pathipu-mobile.component';

describe('PathipuMobileComponent', () => {
  let component: PathipuMobileComponent;
  let fixture: ComponentFixture<PathipuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathipuMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathipuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
